import { useState, useEffect, useCallback } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Progress } from "../../components/ui/progress";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
    Package,
    Truck,
    MapPin,
    Clock,
    CheckCircle2,
    Search,
    ArrowLeft,
    Phone,
    Mail,
    Weight,
    Ruler,
    Thermometer,
    Shield,
    RefreshCw,
    Navigation,
    Box,
    User,
    Calendar,
    AlertCircle,
    Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const MOCK_EVENTS = [
    {
        id: "evt-001",
        timestamp: new Date(Date.now() - 86400000 * 4),
        location: "New York, NY",
        status: "Package Picked Up",
        description: "Package collected from sender's address by courier agent #A2847",
        type: "pickup",
    },
    {
        id: "evt-002",
        timestamp: new Date(Date.now() - 86400000 * 3.5),
        location: "New York Sorting Center",
        status: "Arrived at Facility",
        description: "Package scanned and sorted at regional hub. Weight verified: 2.4 kg",
        type: "transit",
    },
];

const LIVE_UPDATES = [
    {
        location: "Los Angeles Sorting Center",
        status: "Arrived at Local Facility",
        description: "Package arrived at destination city sorting center",
        type: "transit",
    },
    {
        location: "Los Angeles, CA",
        status: "Out for Delivery",
        description: "Package loaded on delivery vehicle. Driver: Mike R. — Vehicle #DV-1185",
        type: "out_for_delivery",
    },
    {
        location: "1234 Sunset Blvd, Los Angeles",
        status: "Delivered",
        description: "Package delivered successfully. Signed by: Sarah Johnson.",
        type: "delivered",
    },
];

const MOCK_SHIPMENT = {
    trackingId: "CRX-2026-8847-5521",
    carrier: "CourierX Express",
    service: "Priority Express Freight",
    status: "in_transit",
    estimatedDelivery: new Date(Date.now() + 86400000),
    origin: { city: "New York", country: "United States", address: "450 5th Avenue, Suite 301" },
    destination: { city: "Los Angeles", country: "United States", address: "1234 Sunset Blvd, Apt 12B" },
    sender: { name: "TechNova Inc.", phone: "+1 (212) 555-0147", email: "shipping@technova.com" },
    receiver: { name: "Sarah Johnson", phone: "+1 (310) 555-0293", email: "sarah.j@email.com" },
    packageInfo: {
        weight: "2.4 kg",
        dimensions: "32 × 24 × 15 cm",
        type: "Fragile Electronics",
        contents: "Laptop & Accessories",
        declaredValue: "$1,849.00",
        insurance: true,
    },
    events: [...MOCK_EVENTS],
    currentLocation: { lat: 34.0522, lng: -118.2437, city: "Los Angeles, CA" },
    progress: 72,
    temperature: "22°C",
    priority: "express",
};

const statusConfig = {
    picked_up: { label: "Picked Up", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", icon: <Package className="w-3.5 h-3.5" /> },
    in_transit: { label: "In Transit", color: "bg-amber-500/20 text-amber-400 border-amber-500/30", icon: <Truck className="w-3.5 h-3.5" /> },
    out_for_delivery: { label: "Out for Delivery", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30", icon: <Navigation className="w-3.5 h-3.5" /> },
    delivered: { label: "Delivered", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
};

const eventIconMap = {
    pickup: <Package className="w-4 h-4" />,
    transit: <Truck className="w-4 h-4" />,
    customs: <Shield className="w-4 h-4" />,
    out_for_delivery: <Navigation className="w-4 h-4" />,
    delivered: <CheckCircle2 className="w-4 h-4" />,
    info: <AlertCircle className="w-4 h-4" />,
};

const eventColorMap = {
    pickup: "bg-blue-500/20 text-blue-400 border-blue-500/40",
    transit: "bg-amber-500/20 text-amber-400 border-amber-500/40",
    customs: "bg-purple-500/20 text-purple-400 border-purple-500/40",
    out_for_delivery: "bg-cyan-500/20 text-cyan-400 border-cyan-500/40",
    delivered: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
    info: "bg-gray-500/20 text-gray-400 border-gray-500/40",
};

const Tracking = () => {
    const navigate = useNavigate();
    const [shipment, setShipment] = useState(MOCK_SHIPMENT);
    const [trackingInput, setTrackingInput] = useState("CRX-2026-8847-5521");
    const [isTracking, setIsTracking] = useState(false);
    const [isLive, setIsLive] = useState(false);
    const [liveUpdateIndex, setLiveUpdateIndex] = useState(0);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [lastRefresh, setLastRefresh] = useState(new Date());

    const formatTime = (date) =>
        date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

    const formatDate = (date) =>
        date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

    const formatDateTime = (date) => `${formatDate(date)} — ${formatTime(date)}`;

    const startTracking = useCallback(() => {
        if (!trackingInput.trim()) return;
        setIsTracking(true);
        setIsLive(true);
        setLiveUpdateIndex(0);
        setElapsedSeconds(0);
        setShipment({ ...MOCK_SHIPMENT, events: [...MOCK_EVENTS] });
        setLastRefresh(new Date());
    }, [trackingInput]);

    useEffect(() => {
        if (!isLive || liveUpdateIndex >= LIVE_UPDATES.length) {
            if (liveUpdateIndex >= LIVE_UPDATES.length) setIsLive(false);
            return;
        }

        const timer = setTimeout(() => {
            const update = LIVE_UPDATES[liveUpdateIndex];

            const newEvent = {
                ...update,
                id: `live-${liveUpdateIndex}`,
                timestamp: new Date(),
            };

            setShipment((prev) => {
                const totalSteps = MOCK_EVENTS.length + LIVE_UPDATES.length;
                const currentStep = MOCK_EVENTS.length + liveUpdateIndex + 1;
                const newProgress = Math.min(Math.round((currentStep / totalSteps) * 100), 100);

                const newStatus =
                    update.type === "delivered"
                        ? "delivered"
                        : update.type === "out_for_delivery"
                            ? "out_for_delivery"
                            : prev.status;

                return {
                    ...prev,
                    events: [...prev.events, newEvent],
                    progress: newProgress,
                    status: newStatus,
                    actualDelivery: update.type === "delivered" ? new Date() : prev.actualDelivery,
                };
            });

            setLiveUpdateIndex((i) => i + 1);
            setLastRefresh(new Date());
        }, 3000 + Math.random() * 2000);

        return () => clearTimeout(timer);
    }, [isLive, liveUpdateIndex]);

    useEffect(() => {
        if (!isTracking) return;
        const interval = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
        return () => clearInterval(interval);
    }, [isTracking]);

    const formatElapsed = (s) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m}m ${sec.toString().padStart(2, "0")}s`;
    };

    const milestones = [
        { label: "Picked Up", key: "picked_up", icon: <Package className="w-4 h-4" /> },
        { label: "In Transit", key: "in_transit", icon: <Truck className="w-4 h-4" /> },
        { label: "Out for Delivery", key: "out_for_delivery", icon: <Navigation className="w-4 h-4" /> },
        { label: "Delivered", key: "delivered", icon: <CheckCircle2 className="w-4 h-4" /> },
    ];

    const statusOrder = ["picked_up", "in_transit", "out_for_delivery", "delivered"];
    const statusInfo = statusConfig[shipment.status];
    const currentIndex = statusOrder.indexOf(shipment.status);


    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b border-border bg-card/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")} className="text-muted-foreground hover:text-foreground">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <div>
                            <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
                                <Truck className="w-5 h-5 text-primary" />
                                Shipment Tracking
                            </h1>
                            <p className="text-xs text-muted-foreground">Real-time courier tracking</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {isLive && (
                            <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                LIVE
                            </Badge>
                        )}
                        <span className="text-xs text-muted-foreground hidden sm:inline">
                            Last updated: {formatTime(lastRefresh)}
                        </span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
                {/* Search */}
                <Card className="bg-card/60 backdrop-blur border-border overflow-hidden">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    value={trackingInput}
                                    onChange={(e) => setTrackingInput(e.target.value)}
                                    placeholder="Enter tracking number (e.g. CRX-2026-8847-5521)"
                                    className="pl-10 bg-muted/50 border-border h-11"
                                    onKeyDown={(e) => e.key === "Enter" && startTracking()}
                                />
                            </div>
                            <Button onClick={startTracking} className="h-11 px-6 gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                                {isTracking ? <RefreshCw className="w-4 h-4" /> : <Search className="w-4 h-4" />}
                                {isTracking ? "Refresh" : "Track"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {isTracking && (
                    <>
                        {/* Progress Milestones */}
                        <Card className="bg-card/60 backdrop-blur border-border overflow-hidden">
                            <CardContent className="p-4 sm:p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <Badge className={`${statusInfo.color} border gap-1.5`}>
                                            {statusInfo.icon}
                                            {statusInfo.label}
                                        </Badge>
                                        <span className="text-sm font-semibold text-foreground">{shipment.progress}%</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                        ETA: {formatDate(shipment.estimatedDelivery)}
                                    </span>
                                </div>

                                <Progress value={shipment.progress} className="h-2 mb-6" />

                                {/* Milestone steps */}
                                <div className="grid grid-cols-4 gap-2">
                                    {milestones.map((m, i) => {
                                        const isComplete = i <= currentIndex;
                                        const isCurrent = i === currentIndex;
                                        return (
                                            <div key={m.key} className="flex flex-col items-center text-center gap-1.5">
                                                <div
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${isComplete
                                                            ? "bg-primary/20 border-primary text-primary"
                                                            : "bg-muted/50 border-border text-muted-foreground"
                                                        } ${isCurrent ? "ring-4 ring-primary/20 scale-110" : ""}`}
                                                >
                                                    {m.icon}
                                                </div>
                                                <span className={`text-[11px] font-medium leading-tight ${isComplete ? "text-foreground" : "text-muted-foreground"}`}>
                                                    {m.label}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Stats Row */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                            {[
                                { label: "Tracking ID", value: shipment.trackingId, icon: <Box className="w-4 h-4" />, accent: "text-primary" },
                                { label: "Service", value: shipment.service, icon: <Zap className="w-4 h-4" />, accent: "text-amber-400" },
                                { label: "Tracking Time", value: formatElapsed(elapsedSeconds), icon: <Clock className="w-4 h-4" />, accent: "text-cyan-400" },
                                { label: "Total Events", value: `${shipment.events.length} updates`, icon: <RefreshCw className="w-4 h-4" />, accent: "text-emerald-400" },
                            ].map((stat) => (
                                <Card key={stat.label} className="bg-card/60 backdrop-blur border-border">
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={stat.accent}>{stat.icon}</span>
                                            <span className="text-[11px] text-muted-foreground uppercase tracking-wide">{stat.label}</span>
                                        </div>
                                        <p className="text-sm font-bold text-foreground truncate">{stat.value}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Main Content */}
                        <div className="grid lg:grid-cols-3 gap-4">
                            {/* Timeline */}
                            <div className="lg:col-span-2">
                                <Card className="bg-card/60 backdrop-blur border-border h-full">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-base font-semibold flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-primary" />
                                            Tracking Timeline
                                            <Badge variant="secondary" className="ml-auto text-[10px]">
                                                {shipment.events.length} events
                                            </Badge>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <ScrollArea className="h-[420px] pr-3">
                                            <div className="space-y-0">
                                                {[...shipment.events].reverse().map((event, index) => {
                                                    const isLatest = index === 0;
                                                    const colorClass = eventColorMap[event.type] || eventColorMap.info;
                                                    return (
                                                        <div key={event.id} className="flex gap-3 group relative">
                                                            {/* Timeline line */}
                                                            <div className="flex flex-col items-center">
                                                                <div
                                                                    className={`w-9 h-9 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${colorClass} ${isLatest ? "ring-4 ring-primary/10 scale-110" : ""
                                                                        }`}
                                                                >
                                                                    {eventIconMap[event.type]}
                                                                </div>
                                                                {index < shipment.events.length - 1 && (
                                                                    <div className="w-0.5 h-full min-h-[40px] bg-border/60" />
                                                                )}
                                                            </div>

                                                            {/* Content */}
                                                            <div className={`pb-5 flex-1 ${isLatest ? "" : "opacity-80"}`}>
                                                                <div className="flex items-start justify-between gap-2 mb-0.5">
                                                                    <h4 className={`text-sm font-semibold ${isLatest ? "text-foreground" : "text-foreground/80"}`}>
                                                                        {event.status}
                                                                        {isLatest && isLive && (
                                                                            <span className="ml-2 text-[10px] text-emerald-400 font-normal animate-pulse">● LIVE</span>
                                                                        )}
                                                                    </h4>
                                                                    <time className="text-[10px] text-muted-foreground whitespace-nowrap shrink-0">
                                                                        {formatDateTime(event.timestamp)}
                                                                    </time>
                                                                </div>
                                                                <div className="flex items-center gap-1.5 mb-1">
                                                                    <MapPin className="w-3 h-3 text-muted-foreground shrink-0" />
                                                                    <span className="text-xs text-muted-foreground">{event.location}</span>
                                                                </div>
                                                                <p className="text-xs text-muted-foreground/80 leading-relaxed">{event.description}</p>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </ScrollArea>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Sidebar Details */}
                            <div className="space-y-4">
                                <Tabs defaultValue="shipment" className="w-full">
                                    <TabsList className="w-full bg-muted/50">
                                        <TabsTrigger value="shipment" className="flex-1 text-xs">Shipment</TabsTrigger>
                                        <TabsTrigger value="parties" className="flex-1 text-xs">Parties</TabsTrigger>
                                        <TabsTrigger value="package" className="flex-1 text-xs">Package</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="shipment" className="mt-3 space-y-3">
                                        <Card className="bg-card/60 backdrop-blur border-border">
                                            <CardContent className="p-4 space-y-3">
                                                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Route</h3>
                                                <div className="space-y-3">
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                                                            <MapPin className="w-3.5 h-3.5 text-blue-400" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-semibold text-foreground">Origin</p>
                                                            <p className="text-[11px] text-muted-foreground">{shipment.origin.address}</p>
                                                            <p className="text-[11px] text-muted-foreground">{shipment.origin.city}, {shipment.origin.country}</p>
                                                        </div>
                                                    </div>
                                                    <div className="ml-4 border-l-2 border-dashed border-border h-4" />
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                                                            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-semibold text-foreground">Destination</p>
                                                            <p className="text-[11px] text-muted-foreground">{shipment.destination.address}</p>
                                                            <p className="text-[11px] text-muted-foreground">{shipment.destination.city}, {shipment.destination.country}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="pt-2 border-t border-border space-y-2">
                                                    <div className="flex justify-between">
                                                        <span className="text-[11px] text-muted-foreground">Carrier</span>
                                                        <span className="text-[11px] font-medium text-foreground">{shipment.carrier}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-[11px] text-muted-foreground">Priority</span>
                                                        <Badge className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] h-5">
                                                            {shipment.priority.toUpperCase()}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-[11px] text-muted-foreground">Est. Delivery</span>
                                                        <span className="text-[11px] font-medium text-foreground">
                                                            {formatDate(shipment.estimatedDelivery)}
                                                        </span>
                                                    </div>
                                                    {shipment.actualDelivery && (
                                                        <div className="flex justify-between">
                                                            <span className="text-[11px] text-muted-foreground">Delivered</span>
                                                            <span className="text-[11px] font-medium text-emerald-400">
                                                                {formatDateTime(shipment.actualDelivery)}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </TabsContent>

                                    <TabsContent value="parties" className="mt-3 space-y-3">
                                        {[
                                            { title: "Sender", data: shipment.sender },
                                            { title: "Receiver", data: shipment.receiver },
                                        ].map((party) => (
                                            <Card key={party.title} className="bg-card/60 backdrop-blur border-border">
                                                <CardContent className="p-4 space-y-2.5">
                                                    <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{party.title}</h3>
                                                    <div className="flex items-center gap-2">
                                                        <User className="w-3.5 h-3.5 text-muted-foreground" />
                                                        <span className="text-xs font-medium text-foreground">{party.data.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                                                        <span className="text-[11px] text-muted-foreground">{party.data.phone}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                                                        <span className="text-[11px] text-muted-foreground">{party.data.email}</span>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </TabsContent>

                                    <TabsContent value="package" className="mt-3">
                                        <Card className="bg-card/60 backdrop-blur border-border">
                                            <CardContent className="p-4 space-y-3">
                                                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Package Details</h3>
                                                {[
                                                    { icon: <Weight className="w-3.5 h-3.5" />, label: "Weight", value: shipment.packageInfo.weight },
                                                    { icon: <Ruler className="w-3.5 h-3.5" />, label: "Dimensions", value: shipment.packageInfo.dimensions },
                                                    { icon: <Box className="w-3.5 h-3.5" />, label: "Type", value: shipment.packageInfo.type },
                                                    { icon: <Package className="w-3.5 h-3.5" />, label: "Contents", value: shipment.packageInfo.contents },
                                                    { icon: <Calendar className="w-3.5 h-3.5" />, label: "Value", value: shipment.packageInfo.declaredValue },
                                                    { icon: <Thermometer className="w-3.5 h-3.5" />, label: "Temperature", value: shipment.temperature || "N/A" },
                                                ].map((item) => (
                                                    <div key={item.label} className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2 text-muted-foreground">
                                                            {item.icon}
                                                            <span className="text-[11px]">{item.label}</span>
                                                        </div>
                                                        <span className="text-[11px] font-medium text-foreground">{item.value}</span>
                                                    </div>
                                                ))}
                                                <div className="flex items-center justify-between pt-2 border-t border-border">
                                                    <div className="flex items-center gap-2 text-muted-foreground">
                                                        <Shield className="w-3.5 h-3.5" />
                                                        <span className="text-[11px]">Insurance</span>
                                                    </div>
                                                    <Badge className={`text-[10px] h-5 ${shipment.packageInfo.insurance ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"} border`}>
                                                        {shipment.packageInfo.insurance ? "Covered" : "None"}
                                                    </Badge>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Tracking;

