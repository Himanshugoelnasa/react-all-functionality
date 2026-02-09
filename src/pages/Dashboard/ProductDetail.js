import { useState, useEffect, useCallback } from "react";
import {
  ShoppingCart, Heart, Star, Truck, Shield, RotateCcw, ChevronLeft, ChevronRight,
  MapPin, Check, X, Zap, Package, BadgePercent, Share2,
  ThumbsUp, MessageSquare, Eye, Copy, ChevronDown, ChevronUp, Flame
} from "lucide-react";

import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Card, CardContent } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";
import { useToast } from "../../hooks/use-toast";


/* ---------------------- MOCK DATA ---------------------- */

const PRODUCT = {
  id: "PRD-29481",
  name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
  brand: "Sony",
  category: "Electronics / Audio / Headphones",
  price: 349.99,
  originalPrice: 399.99,
  rating: 4.7,
  reviewCount: 12847,
  soldCount: 54200,
  wishlistCount: 8930,
  sku: "SONY-WH1000XM5-BLK",

  colors: [
    { name: "Black", hex: "#1a1a2e" },
    { name: "Silver", hex: "#a0a0b0" },
    { name: "Midnight Blue", hex: "#1e3a5f" },
  ],

  sizes: ["One Size"],

  highlights: [
    "Industry-leading noise cancellation with Auto NC Optimizer",
    "Crystal clear hands-free calling with 4 beamforming microphones",
    "Up to 30-hour battery life with quick charging (3 min = 3 hours)",
    "Multipoint connection for seamless switching between devices",
    "Ultra-comfortable lightweight design at just 250g",
  ],

  specifications: {
    "Driver Unit": "30mm",
    "Frequency Response": "4 Hz – 40,000 Hz",
    "Battery Life": "Up to 30 hours (NC ON)",
    "Charging Time": "3.5 hours (Full) / 3 min (3 hours playback)",
    "Weight": "250g",
    "Bluetooth Version": "5.2",
    "Codec Support": "SBC, AAC, LDAC",
    "NFC": "Yes",
    "Noise Cancellation": "Adaptive (Auto NC Optimizer)",
    "Microphones": "4 Beamforming + 1 Feedback",
  },

  images: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
    "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&q=80",
    "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&q=80",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80",
  ],

  coupons: [
    { code: "AUDIO20", discount: "20% OFF", description: "On premium audio", minOrder: 200, expiry: "Feb 28, 2026" },
    { code: "NEWUSER50", discount: "$50 OFF", description: "First purchase", minOrder: 150, expiry: "Mar 15, 2026" },
    { code: "FREESHIP", discount: "Free Shipping", description: "No minimum order", minOrder: 0, expiry: "Feb 20, 2026" },
  ],

  reviews: [
    { user: "Alex M.", rating: 5, date: "Jan 25, 2026", comment: "Best noise cancellation I've ever experienced.", helpful: 234, avatar: "A" },
    { user: "Sarah K.", rating: 4, date: "Jan 18, 2026", comment: "Great headphones overall.", helpful: 89, avatar: "S" },
    { user: "David R.", rating: 5, date: "Jan 10, 2026", comment: "Call quality improvement alone is worth it.", helpful: 156, avatar: "D" },
  ],

  ratingBreakdown: { 5: 72, 4: 18, 3: 6, 2: 2, 1: 2 },
};


const DELIVERY_INFO = {
  "10001": { available: true, date: "Feb 13 – Feb 15, 2026", express: "Feb 11, 2026", cod: true },
  "90210": { available: true, date: "Feb 14 – Feb 16, 2026", express: "Feb 12, 2026", cod: false },
  "00000": { available: false, date: "", express: "", cod: false },
};


/* ---------------------- COMPONENT ---------------------- */

export default function ProductDetail() {

  const { toast } = useToast();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [pincode, setPincode] = useState("");
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [showAllSpecs, setShowAllSpecs] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState(null);
  const [imageZoom, setImageZoom] = useState(false);
  const [viewerCount] = useState(Math.floor(Math.random() * 50) + 30);

  const discount = Math.round(((PRODUCT.originalPrice - PRODUCT.price) / PRODUCT.originalPrice) * 100);


  /* ---------------------- IMAGE AUTO SLIDER ---------------------- */

  const nextImage = useCallback(() => {
    setSelectedImage(i => (i + 1) % PRODUCT.images.length);
  }, []);

  const prevImage = useCallback(() => {
    setSelectedImage(i => (i - 1 + PRODUCT.images.length) % PRODUCT.images.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [nextImage]);


  /* ---------------------- ACTIONS ---------------------- */

  const checkPincode = () => {
    const info = DELIVERY_INFO[pincode] || DELIVERY_INFO["10001"];
    setDeliveryInfo(info);
    setPincodeChecked(true);
  };

  const copyCoupon = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);

    toast({
      title: "Coupon Copied!",
      description: `${code} has been copied to clipboard.`,
    });

    setTimeout(() => setCopiedCoupon(null), 2000);
  };

  const addToCart = () => {
    toast({
      title: "Added to Cart 🛒",
      description: `${quantity}x ${PRODUCT.name}`,
    });
  };

  const buyNow = () => {
    toast({
      title: "Proceeding to Checkout ⚡",
      description: "Redirecting to payment...",
    });
  };


  /* ---------------------- UI ---------------------- */

  return (
    <div className="min-h-screen bg-background">
      {/* Top Banner */}
      <div className="bg-primary/10 border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-2 text-sm">
          <Flame className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-primary font-semibold">Flash Sale!</span>
          <span className="text-muted-foreground">Extra {discount}% off — Limited time offer</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <p className="text-xs text-muted-foreground mb-4">{PRODUCT.category}</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* IMAGE SECTION */}
          <div className="space-y-4">
            <div
              className="relative group rounded-2xl overflow-hidden bg-card border border-border aspect-square cursor-zoom-in"
              onClick={() => setImageZoom(!imageZoom)}
            >
              <img
                src={PRODUCT.images[selectedImage]}
                alt={PRODUCT.name}
                className={`w-full h-full object-cover transition-transform duration-500 ${imageZoom ? "scale-150" : "group-hover:scale-105"}`}
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <Badge className="bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1">{discount}% OFF</Badge>
                <Badge className="bg-primary text-primary-foreground text-xs px-3 py-1">Bestseller</Badge>
              </div>
              {/* Nav arrows */}
              <button onClick={e => { e.stopPropagation(); prevImage(); }} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={e => { e.stopPropagation(); nextImage(); }} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="w-5 h-5" />
              </button>
              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {PRODUCT.images.map((_, i) => (
                  <button key={i} onClick={e => { e.stopPropagation(); setSelectedImage(i); }}
                    className={`w-2 h-2 rounded-full transition-all ${i === selectedImage ? "bg-primary w-6" : "bg-foreground/40"}`} />
                ))}
              </div>
              {/* Live viewers */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-background/80 backdrop-blur rounded-full px-3 py-1 text-xs text-foreground">
                <Eye className="w-3 h-3 text-primary" />
                <span>{viewerCount} watching</span>
              </div>
            </div>
            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-1">
              {PRODUCT.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${i === selectedImage ? "border-primary ring-2 ring-primary/30" : "border-border opacity-60 hover:opacity-100"}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* DETAILS SECTION */}
          <div className="space-y-5">
            <div>
              <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-1">{PRODUCT.brand}</p>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">{PRODUCT.name}</h1>
              <div className="flex items-center gap-3 mt-3 flex-wrap">
                <div className="flex items-center gap-1 bg-primary/20 text-primary px-2.5 py-1 rounded-lg text-sm font-semibold">
                  <Star className="w-4 h-4 fill-current" /> {PRODUCT.rating}
                </div>
                <span className="text-muted-foreground text-sm">{PRODUCT.reviewCount.toLocaleString()} ratings</span>
                <span className="text-muted-foreground text-sm">•</span>
                <span className="text-muted-foreground text-sm">{PRODUCT.soldCount.toLocaleString()} sold</span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-extrabold text-foreground">${PRODUCT.price}</span>
                <span className="text-lg text-muted-foreground line-through">${PRODUCT.originalPrice}</span>
                <Badge variant="destructive" className="text-sm">Save ${(PRODUCT.originalPrice - PRODUCT.price).toFixed(2)}</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Inclusive of all taxes • EMI from $29/mo</p>
            </div>

            {/* Colors */}
            <div>
              <p className="text-sm font-semibold text-foreground mb-2">Color: <span className="text-primary">{PRODUCT.colors[selectedColor].name}</span></p>
              <div className="flex gap-3">
                {PRODUCT.colors.map((c, i) => (
                  <button key={i} onClick={() => setSelectedColor(i)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${i === selectedColor ? "border-primary ring-4 ring-primary/20 scale-110" : "border-border"}`}
                    style={{ background: c.hex }} title={c.name} />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <p className="text-sm font-semibold text-foreground">Qty:</p>
              <div className="flex items-center border border-border rounded-xl overflow-hidden">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-foreground hover:bg-muted transition-colors text-lg">−</button>
                <span className="px-5 py-2 text-foreground font-semibold border-x border-border bg-card min-w-[3rem] text-center">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(10, quantity + 1))} className="px-4 py-2 text-foreground hover:bg-muted transition-colors text-lg">+</button>
              </div>
              <span className="text-xs text-muted-foreground">Only 5 left in stock!</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3">
              <Button onClick={addToCart} size="lg" variant="outline" className="flex-1 gap-2 rounded-xl h-14 text-base border-primary text-primary hover:bg-primary/10">
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </Button>
              <Button onClick={buyNow} size="lg" className="flex-1 gap-2 rounded-xl h-14 text-base bg-primary text-primary-foreground hover:bg-primary/90">
                <Zap className="w-5 h-5" /> Buy Now
              </Button>
              <button onClick={() => { setWishlisted(!wishlisted); toast({ title: wishlisted ? "Removed from Wishlist" : "Added to Wishlist ❤️" }); }}
                className={`p-4 rounded-xl border transition-all ${wishlisted ? "bg-red-500/20 border-red-500/50 text-red-400" : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"}`}>
                <Heart className={`w-5 h-5 ${wishlisted ? "fill-current" : ""}`} />
              </button>
              <button className="p-4 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Coupons */}
            <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <BadgePercent className="w-5 h-5 text-primary" />
                <p className="text-sm font-semibold text-foreground">Available Coupons</p>
              </div>
              <div className="space-y-2">
                {PRODUCT.coupons.map(c => (
                  <div key={c.code} className="flex items-center justify-between bg-muted/50 rounded-xl px-4 py-3 border border-dashed border-primary/30">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary text-sm">{c.discount}</span>
                        <span className="text-xs text-muted-foreground">• {c.description}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">Code: <span className="font-mono font-semibold text-foreground">{c.code}</span> • Expires {c.expiry}</p>
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => copyCoupon(c.code)} className="gap-1 text-primary hover:bg-primary/10">
                      {copiedCoupon === c.code ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copiedCoupon === c.code ? "Copied" : "Copy"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Pincode & Delivery */}
            <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <p className="text-sm font-semibold text-foreground">Delivery Details</p>
              </div>
              <div className="flex gap-2">
                <Input placeholder="Enter pincode" value={pincode} onChange={e => { setPincode(e.target.value); setPincodeChecked(false); }}
                  className="rounded-xl bg-muted border-border" maxLength={6} />
                <Button onClick={checkPincode} variant="outline" className="rounded-xl border-primary text-primary hover:bg-primary/10 shrink-0">Check</Button>
              </div>
              {pincodeChecked && deliveryInfo && (
                <div className="space-y-2 animate-fade-in">
                  {deliveryInfo.available ? (
                    <>
                      <div className="flex items-center gap-2 text-sm"><Truck className="w-4 h-4 text-primary" /><span className="text-foreground">Standard: <span className="font-semibold">{deliveryInfo.date}</span></span></div>
                      <div className="flex items-center gap-2 text-sm"><Zap className="w-4 h-4 text-primary" /><span className="text-foreground">Express: <span className="font-semibold">{deliveryInfo.express}</span></span></div>
                      <div className="flex items-center gap-2 text-sm">
                        {deliveryInfo.cod ? <Check className="w-4 h-4 text-primary" /> : <X className="w-4 h-4 text-destructive" />}
                        <span className="text-foreground">Cash on Delivery {deliveryInfo.cod ? "available" : "not available"}</span>
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-destructive flex items-center gap-2"><X className="w-4 h-4" /> Delivery not available at this pincode</p>
                  )}
                </div>
              )}
              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
                {[
                  { icon: Shield, label: "1 Year Warranty" },
                  { icon: RotateCcw, label: "7-Day Returns" },
                  { icon: Package, label: "Genuine Product" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1 py-2 rounded-lg bg-muted/50 text-center">
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="text-xs text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Tabs */}
        <div className="mt-10">
          <Tabs defaultValue="highlights" className="w-full">
            <TabsList className="w-full justify-start bg-card border border-border rounded-xl h-auto p-1 flex-wrap">
              {["highlights", "specifications", "reviews"].map(tab => (
                <TabsTrigger key={tab} value={tab} className="rounded-lg px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground capitalize">
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="highlights" className="mt-6">
              <Card className="bg-card border-border rounded-2xl">
                <CardContent className="p-6 space-y-3">
                  {PRODUCT.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <p className="text-foreground">{h}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card className="bg-card border-border rounded-2xl">
                <CardContent className="p-6">
                  {Object.entries(PRODUCT.specifications).slice(0, showAllSpecs ? undefined : 5).map(([key, val], i) => (
                    <div key={key} className={`flex justify-between py-3 ${i > 0 ? "border-t border-border" : ""}`}>
                      <span className="text-muted-foreground text-sm">{key}</span>
                      <span className="text-foreground font-medium text-sm">{val}</span>
                    </div>
                  ))}
                  <Button variant="ghost" className="w-full mt-2 text-primary gap-1" onClick={() => setShowAllSpecs(!showAllSpecs)}>
                    {showAllSpecs ? <><ChevronUp className="w-4 h-4" /> Show Less</> : <><ChevronDown className="w-4 h-4" /> Show All Specifications</>}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6 space-y-6">
              {/* Rating Summary */}
              <Card className="bg-card border-border rounded-2xl">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-6xl font-extrabold text-foreground">{PRODUCT.rating}</span>
                      <div className="flex gap-1 mt-2">
                        {[1, 2, 3, 4, 5].map(s => (
                          <Star key={s} className={`w-5 h-5 ${s <= Math.round(PRODUCT.rating) ? "text-accent fill-accent" : "text-muted-foreground/30"}`} />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{PRODUCT.reviewCount.toLocaleString()} ratings</p>
                    </div>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map(star => (
                        <div key={star} className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground w-4">{star}</span>
                          <Star className="w-3 h-3 text-accent fill-accent" />
                          <Progress
                            value={PRODUCT.ratingBreakdown[star]}
                            className="h-2 flex-1"
                          />
                          <span className="text-xs text-muted-foreground w-8">{PRODUCT.ratingBreakdown[star]}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reviews */}
              {PRODUCT.reviews.map((r, i) => (
                <Card key={i} className="bg-card border-border rounded-2xl">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-lg shrink-0">{r.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-foreground">{r.user}</p>
                            <div className="flex gap-0.5 mt-0.5">
                              {[1, 2, 3, 4, 5].map(s => (
                                <Star key={s} className={`w-3 h-3 ${s <= r.rating ? "text-accent fill-accent" : "text-muted-foreground/30"}`} />
                              ))}
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">{r.date}</span>
                        </div>
                        <p className="text-sm text-foreground/80 mt-2">{r.comment}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                            <ThumbsUp className="w-3 h-3" /> Helpful ({r.helpful})
                          </button>
                          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                            <MessageSquare className="w-3 h-3" /> Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
