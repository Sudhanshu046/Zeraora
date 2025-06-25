"use client";

import React, { useEffect, useState } from 'react'

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { ExternalLink, ArrowLeft } from 'lucide-react';

interface IUrlData {
    id: string;
    originalUrl: string;
    shortUrl: string;
    clicks: number;
    createdAt: string;
}

const Page = () => {
    const params = useParams();
    const shortCode = params.shortCode as string;
    const [urlData, setUrlData] = useState<IUrlData | null>(null);
    const [redirecting, setRedirecting] = useState(false);

    useEffect(() => {
        const savedUrls = localStorage.getItem('shortenedUrls');
        if (savedUrls) {
            const urls: IUrlData[] = JSON.parse(savedUrls);
            const foundUrl = urls.find(url => url.id === shortCode);

            if (foundUrl) {
                setUrlData(foundUrl);

                // Update click count
                const updatedUrls = urls.map(url =>
                    url.id === shortCode ? { ...url, clicks: url.clicks + 1 } : url
                );
                localStorage.setItem('shortenedUrls', JSON.stringify(updatedUrls));
            }
        }
    }, [shortCode]);

    const handleRedirect = () => {
        if (urlData) {
            setRedirecting(true);
            window.location.href = urlData.originalUrl;
        }
    };

    if (!urlData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <Card className="w-full max-w-md mx-4">
                    <CardContent className="text-center p-8">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ExternalLink className="h-8 w-8 text-red-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Link Not Found
                        </h1>
                        <p className="text-gray-600 mb-6">
                            The short URL you're looking for doesn't exist or has expired.
                        </p>
                        <Link href="/">
                            <Button className="flex items-center gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                Go Back Home
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
            <Card className="w-full max-w-md mx-4">
                <CardContent className="text-center p-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ExternalLink className="h-8 w-8 text-blue-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Redirecting...
                    </h1>
                    <p className="text-gray-600 mb-6">
                        You'll be redirected to:
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <p className="text-sm text-gray-800 break-all">
                            {urlData.originalUrl}
                        </p>
                    </div>
                    <div className="space-y-3">
                        <Button
                            onClick={handleRedirect}
                            disabled={redirecting}
                            className="w-full"
                        >
                            {redirecting ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Redirecting...
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <ExternalLink className="h-4 w-4" />
                                    Continue to Website
                                </div>
                            )}
                        </Button>
                        <Link href="/">
                            <Button variant="outline" className="w-full">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Go Back Home
                            </Button>
                        </Link>
                    </div>
                    <div className="mt-6 text-xs text-gray-500">
                        <p>This link has been clicked {urlData.clicks} times</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default Page