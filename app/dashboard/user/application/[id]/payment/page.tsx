"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  CheckCircle2,
  Building2,
  Wallet,
  ArrowLeft,
  Lock,
  AlertCircle,
} from "lucide-react";

// Payment methods
type PaymentMethod = "card" | "fpx" | "ewallet";

interface PaymentState {
  stage: "form" | "processing" | "success";
}

const PaymentPage = () => {
  const params = useParams();
  const router = useRouter();
  const applicationId = params.id as string;

  // State
  const [paymentState, setPaymentState] = useState<PaymentState>({
    stage: "form",
  });
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card");
  const [isProcessing, setIsProcessing] = useState(false);

  // Form data
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  // Mock payment details
  const paymentDetails = {
    applicationFee: 500.0,
    processingFee: 10.0,
    total: 510.0,
    currency: "MYR",
    programme: "DE Rantau",
    applicationId: applicationId,
  };

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
    return formatted.substring(0, 19);
  };

  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + "/" + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  // Handle payment submission
  const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentState({ stage: "processing" });

    // Simulate payment processing
    setTimeout(() => {
      setPaymentState({ stage: "success" });
      setIsProcessing(false);
    }, 3000);
  };

  // Render payment form
  const renderPaymentForm = () => (
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Payment Form - Left Side */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="border bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Payment Method</CardTitle>
            <CardDescription>
              Choose your preferred payment method
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedMethod}
              onValueChange={(value: string) =>
                setSelectedMethod(value as PaymentMethod)
              }
            >
              <div className="space-y-3">
                <div
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedMethod === "card"
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedMethod("card")}
                >
                  <RadioGroupItem value="card" id="card" />
                  <Label
                    htmlFor="card"
                    className="flex items-center gap-3 cursor-pointer flex-1"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Credit / Debit Card
                      </p>
                      <p className="text-sm text-gray-500">
                        Visa, Mastercard, Amex
                      </p>
                    </div>
                  </Label>
                </div>

                <div
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedMethod === "fpx"
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedMethod("fpx")}
                >
                  <RadioGroupItem value="fpx" id="fpx" />
                  <Label
                    htmlFor="fpx"
                    className="flex items-center gap-3 cursor-pointer flex-1"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-50">
                      <Building2 className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Online Banking (FPX)
                      </p>
                      <p className="text-sm text-gray-500">
                        Malaysian banks only
                      </p>
                    </div>
                  </Label>
                </div>

                <div
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedMethod === "ewallet"
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedMethod("ewallet")}
                >
                  <RadioGroupItem value="ewallet" id="ewallet" />
                  <Label
                    htmlFor="ewallet"
                    className="flex items-center gap-3 cursor-pointer flex-1"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-50">
                      <Wallet className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">E-Wallet</p>
                      <p className="text-sm text-gray-500">
                        GrabPay, Touch 'n Go, Boost
                      </p>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Payment Details Form */}
        {selectedMethod === "card" && (
          <Card className="border bg-card shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Card Information</CardTitle>
              <CardDescription>
                Enter your card details securely
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) =>
                    setCardNumber(formatCardNumber(e.target.value))
                  }
                  maxLength={19}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input
                  id="cardName"
                  placeholder="JOHN DOE"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value.toUpperCase())}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) =>
                      setExpiryDate(formatExpiryDate(e.target.value))
                    }
                    maxLength={5}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    type="password"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                    maxLength={4}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500 pt-2">
                <Lock className="h-4 w-4" />
                <p>Your payment information is encrypted and secure</p>
              </div>
            </CardContent>
          </Card>
        )}

        {selectedMethod === "fpx" && (
          <Card className="border bg-card shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Select Your Bank</CardTitle>
              <CardDescription>
                You&apos;ll be redirected to your bank&apos;s login page
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="bank">Bank</Label>
                <select
                  id="bank"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option>Select your bank</option>
                  <option>Maybank</option>
                  <option>CIMB Bank</option>
                  <option>Public Bank</option>
                  <option>Hong Leong Bank</option>
                  <option>RHB Bank</option>
                  <option>AmBank</option>
                </select>
              </div>
            </CardContent>
          </Card>
        )}

        {selectedMethod === "ewallet" && (
          <Card className="border bg-card shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Select E-Wallet</CardTitle>
              <CardDescription>
                Choose your preferred e-wallet provider
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary transition-all">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-green-100 rounded-lg flex items-center justify-center">
                      <Wallet className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="text-sm font-medium">GrabPay</p>
                  </div>
                </button>
                <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary transition-all">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Wallet className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="text-sm font-medium">Touch 'n Go</p>
                  </div>
                </button>
                <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary transition-all">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Wallet className="h-6 w-6 text-orange-600" />
                    </div>
                    <p className="text-sm font-medium">Boost</p>
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Order Summary - Right Side */}
      <div className="lg:col-span-1">
        <Card className="border bg-card shadow-sm sticky top-6">
          <CardHeader>
            <CardTitle className="text-xl">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Programme</span>
                <span className="font-medium text-gray-900">
                  {paymentDetails.programme}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Application ID</span>
                <span className="font-medium text-gray-900 text-xs">
                  {paymentDetails.applicationId}
                </span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Application Fee</span>
                <span className="font-medium text-gray-900">
                  {paymentDetails.currency}{" "}
                  {paymentDetails.applicationFee.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Processing Fee</span>
                <span className="font-medium text-gray-900">
                  {paymentDetails.currency}{" "}
                  {paymentDetails.processingFee.toFixed(2)}
                </span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="font-semibold text-xl text-gray-900">
                {paymentDetails.currency} {paymentDetails.total.toFixed(2)}
              </span>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                <p className="text-xs text-blue-800">
                  Payment is required to proceed with your application. This is
                  a one-time fee.
                </p>
              </div>
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={handlePayment}
              disabled={
                selectedMethod === "card" &&
                (!cardNumber || !cardName || !expiryDate || !cvv)
              }
            >
              <Lock className="h-4 w-4 mr-2" />
              Pay {paymentDetails.currency} {paymentDetails.total.toFixed(2)}
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push("/dashboard/user")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Render processing screen
  const renderProcessingScreen = () => (
    <div className="max-w-2xl mx-auto">
      <Card className="border bg-card shadow-lg">
        <CardContent className="p-12 text-center">
          <div className="mb-6">
            <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto animate-pulse">
              <CreditCard className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-2xl mb-3">Processing Payment...</CardTitle>
          <CardDescription className="text-base mb-6">
            Please wait while we process your payment. This may take a few
            moments.
          </CardDescription>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Lock className="h-4 w-4" />
            <p>Secure payment processing</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Render success screen
  const renderSuccessScreen = () => (
    <div className="max-w-2xl mx-auto">
      <Card className="border bg-card shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
          <CardDescription className="text-base">
            Your payment has been processed successfully
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Payment Summary */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h4 className="font-medium text-gray-900">Payment Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Paid</span>
                <span className="font-medium">
                  {paymentDetails.currency} {paymentDetails.total.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-medium capitalize">{selectedMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction Date</span>
                <span className="font-medium">
                  {new Date().toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Application ID</span>
                <span className="font-medium text-xs">{applicationId}</span>
              </div>
            </div>
          </div>

          {/* Next steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">
              What&apos;s Next?
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• A payment receipt has been sent to your email</li>
              <li>• Your application is now being processed</li>
              <li>• You&apos;ll receive updates on your dashboard</li>
              <li>• We&apos;ll notify you once the review is complete</li>
            </ul>
          </div>

          {/* Action button */}
          <Button
            className="w-full"
            size="lg"
            onClick={() => router.push("/dashboard/user")}
          >
            Back to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <DashboardTopBar
          title="Payment"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Dashboard", href: "/dashboard/user" },
            {
              label: "Application",
              href: `/dashboard/user/application/${applicationId}`,
            },
            { label: "Payment", href: "#" },
          ]}
        />
        <div className="flex-1 overflow-y-auto bg-zinc-100">
          <div className="p-8">
            {paymentState.stage === "form" && renderPaymentForm()}
            {paymentState.stage === "processing" && renderProcessingScreen()}
            {paymentState.stage === "success" && renderSuccessScreen()}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default PaymentPage;
