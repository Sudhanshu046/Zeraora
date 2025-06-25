"use client";

import React, { useState, useEffect } from 'react'
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import {
    Copy,
    Link,
    ExternalLink,
    TrendingUp,
    Zap
} from 'lucide-react';

interface IUrlData {
    id: string;
    originalUrl: string;
    shortUrl: string;
    clicks: number;
    createdAt: string;
}

const Page = () => {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [urls, setUrls] = useState<IUrlData[]>([]);

    useEffect(() => {
        const savedUrls = localStorage.getItem('shortenedUrls');
        if (savedUrls) {
            setUrls(JSON.parse(savedUrls));
        }
    }, []);

    const isValidUrl = (urlString: string) => {
        try {
            const url = new URL(urlString);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch {
            return false;
        }
    };

    const generateShortCode = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!url.trim()) {
            toast.error('Please enter a URL');
            return;
        }

        if (!isValidUrl(url)) {
            toast.error('Please enter a valid URL (including http:// or https://)');
            return;
        }

        setIsLoading(true);

        try {
            const shortCode = generateShortCode();
            const shortUrl = `${window.location.origin}/${shortCode}`;

            const newUrl: IUrlData = {
                id: shortCode,
                originalUrl: url,
                shortUrl,
                clicks: 0,
                createdAt: new Date().toISOString(),
            };

            const updatedUrls = [newUrl, ...urls];
            setUrls(updatedUrls);
            localStorage.setItem('shortenedUrls', JSON.stringify(updatedUrls));

            toast.success('URL shortened successfully!');
            setUrl('');
        } catch (error) {
            toast.error('Failed to shorten URL. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success('Copied to clipboard!');
        } catch {
            toast.error('Failed to copy to clipboard');
        }
    };

    const handleRedirect = (shortCode: string) => {
        const urlData = urls.find(u => u.id === shortCode);
        if (urlData) {
            const updatedUrls = urls.map(u =>
                u.id === shortCode ? { ...u, clicks: u.clicks + 1 } : u
            );
            setUrls(updatedUrls);
            localStorage.setItem('shortenedUrls', JSON.stringify(updatedUrls));
            window.open(urlData.originalUrl, '_blank');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <div className="p-3 bg-blue-600 rounded-full">
                            <Link className="h-8 w-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        URL <span className="text-blue-600">Shortener</span>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Transform long URLs into short, shareable links. Fast, reliable, and completely free.
                    </p>
                </div>

                {/* URL Shortening Form */}
                <Card className="mb-8 border-0 shadow-lg">
                    <CardContent className="p-4">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1">
                                    <Input
                                        type="url"
                                        placeholder="Enter your long URL here..."
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        className="h-12 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                        disabled={isLoading}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Shortening...
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Zap className="h-4 w-4" />
                                            Shorten URL
                                        </div>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* URLs List */}
                {urls.length > 0 && (
                    <Card className="border-0 shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-blue-600" />
                                Recent URLs
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {urls.map((urlData) => (
                                <div key={urlData.id} className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full" />
                                                <span className="text-sm font-medium text-gray-900">
                                                    {urlData.shortUrl}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 truncate">
                                                {urlData.originalUrl}
                                            </p>
                                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                                <span>{urlData.clicks} clicks</span>
                                                <span>Created {new Date(urlData.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => copyToClipboard(urlData.shortUrl)}
                                                className="flex items-center gap-2"
                                            >
                                                <Copy className="h-4 w-4" />
                                                Copy
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleRedirect(urlData.id)}
                                                className="flex items-center gap-2"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                                Visit
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}

                {/* Features */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Zap className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Lightning Fast</h3>
                        <p className="text-gray-600 text-sm">
                            Shorten URLs instantly with our optimized algorithm
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <TrendingUp className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Analytics</h3>
                        <p className="text-gray-600 text-sm">
                            Track clicks and monitor your link performance
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Copy className="h-6 w-6 text-purple-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Easy Sharing</h3>
                        <p className="text-gray-600 text-sm">
                            Copy links with one click and share anywhere
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page