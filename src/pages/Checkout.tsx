import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { mockCourses } from "@/data/mockData";
import { formatINR } from "@/lib/format";
import { ShieldCheck, Lock } from "lucide-react";

export default function Checkout() {
  const { id } = useParams();
  const course = mockCourses.find((c) => c.id === id) || mockCourses[0];

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b py-4 px-6">
        <Link to="/" className="text-2xl font-black text-udemy-heading">udemy</Link>
      </div>

      <div className="container max-w-4xl py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="border-b pb-4 mb-6">
              <h2 className="font-bold mb-4">Order details</h2>
              <div className="flex gap-4">
                <img src={course.thumbnail} alt={course.title} className="w-28 h-16 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-bold text-sm">{course.title}</h3>
                  <p className="text-xs text-muted-foreground">{course.instructor}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{formatINR(course.price)}</p>
                  {course.originalPrice && (
                    <p className="text-xs text-muted-foreground line-through">{formatINR(course.originalPrice)}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="border p-6 bg-secondary/30 rounded-lg">
              <h2 className="font-bold mb-4 flex items-center gap-2">
                <Lock className="h-4 w-4" /> Payment
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Payment is processed securely via Stripe. You will be redirected to complete your purchase.
              </p>
              <Button variant="udemy" className="w-full h-12 text-base">
                Complete Payment — {formatINR(course.price)}
              </Button>
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4" />
                <span>30-Day Money-Back Guarantee · Secure checkout</span>
              </div>
            </div>
          </div>

          <div className="lg:w-72">
            <div className="border p-4 bg-card rounded-lg" style={{ boxShadow: "var(--shadow-card)" }}>
              <h3 className="font-bold mb-3">Summary</h3>
              <div className="flex justify-between text-sm mb-2">
                <span>Original Price:</span>
                <span className="line-through text-muted-foreground">{formatINR(course.originalPrice || course.price)}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Discounts:</span>
                <span className="text-primary font-semibold">-{formatINR((course.originalPrice || course.price) - course.price)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>{formatINR(course.price)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
