import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Rocket, 
  Plane, 
  Building2, 
  FileCheck, 
  HeartHandshake, 
  Shield,
  Briefcase,
  TrendingUp,
  Target,
  UserCheck,
  Globe,
  Wifi,
  Coffee,
  Sparkles,
  ArrowRight,
  Check
} from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-extrabold italic tracking-tighter">
                <span className="text-black">M</span>
                <span className="text-primary">DEC</span>
              </h1>
              <p className="text-gray-500 text-sm">Malaysia Digital Economy Initiatives</p>
            </div>
            <Button variant="outline" className="hidden md:flex items-center gap-2 cursor-pointer">
              <Globe className="h-4 w-4" />
              Contact Us
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <Tabs defaultValue="expats" className="w-full">
          {/* Tab Navigation */}
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12 h-14 p-1 bg-white shadow-md">
            <TabsTrigger value="expats" className="cursor-pointer text-base flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              <Users className="h-4 w-4" />
              Expats
            </TabsTrigger>
            <TabsTrigger value="mtep" className="cursor-pointer text-base flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              <Rocket className="h-4 w-4" />
              MTEP
            </TabsTrigger>
            <TabsTrigger value="derantau" className="cursor-pointer text-base flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              <Plane className="h-4 w-4" />
              DE Rantau
            </TabsTrigger>
          </TabsList>

          {/* Expats Tab */}
          <TabsContent value="expats" className="space-y-12 animate-in fade-in-50 duration-500">
            {/* Hero Section */}
            <div className="relative rounded-2xl bg-gradient-to-r from-black via-gray-900 to-black p-12 text-white overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
              <div className="relative z-10 max-w-3xl">
                <Badge className="mb-4 bg-primary text-white border-0">
                  <Users className="h-3 w-3 mr-1" />
                  Foreign Talent Programme
                </Badge>
                <h2 className="text-5xl font-bold tracking-tight mb-4">
                  Expats Service Centre
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Comprehensive support for foreign knowledge workers in Malaysia's digital economy
                </p>
                <div className="flex gap-3 mt-8">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg cursor-pointer">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 cursor-pointer">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary/20 to-transparent" />
            </div>

            {/* Features Grid */}
            <div>
              <div className="text-center mb-10">
                <h3 className="text-3xl font-bold mb-3">Our Services</h3>
                <p className="text-gray-300 text-lg">Everything you need to work in Malaysia</p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 bg-white">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <FileCheck className="h-6 w-6 text-primary group-hover:text-white" />
                    </div>
                    <CardTitle className="text-xl">Application Processing</CardTitle>
                    <CardDescription className="text-base">Streamlined visa and permit applications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Fast-track processing for tech professionals</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Dedicated application support team</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Real-time application tracking</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 bg-white">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <HeartHandshake className="h-6 w-6 text-primary group-hover:text-white" />
                    </div>
                    <CardTitle className="text-xl">Relocation Support</CardTitle>
                    <CardDescription className="text-base">End-to-end assistance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Housing and accommodation guidance</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Banking and financial setup</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Cultural integration programs</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 bg-white">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <Shield className="h-6 w-6 text-primary group-hover:text-white" />
                    </div>
                    <CardTitle className="text-xl">Compliance Advisory</CardTitle>
                    <CardDescription className="text-base">Stay compliant with regulations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Employment pass renewals</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Regulatory compliance guidance</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Legal advisory services</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* MTEP Tab */}
          <TabsContent value="mtep" className="space-y-12 animate-in fade-in-50 duration-500">
            {/* Hero Section */}
            <div className="relative rounded-2xl bg-gradient-to-br from-primary via-red-600 to-orange-500 p-12 text-white overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
              <div className="relative z-10 max-w-3xl">
                <Badge className="mb-4 bg-white text-primary border-0">
                  <Rocket className="h-3 w-3 mr-1" />
                  Tech Entrepreneur Programme
                </Badge>
                <h2 className="text-5xl font-bold tracking-tight mb-4">
                  Malaysia Tech Entrepreneur Programme
                </h2>
                <p className="text-xl text-white/90 leading-relaxed">
                  Empowering tech entrepreneurs to build, scale, and succeed in Malaysia's thriving digital ecosystem
                </p>
                <div className="flex gap-3 mt-8">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg cursor-pointer">
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 cursor-pointer">
                    View Requirements
                  </Button>
                </div>
              </div>
              <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            </div>

            {/* Pass Types */}
            <div>
              <div className="text-center mb-10">
                <h3 className="text-3xl font-bold mb-3">Choose Your Path</h3>
                <p className="text-gray-500 text-lg">Four specialized passes designed for different stages of your journey</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
                  <CardHeader className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                        <Sparkles className="h-6 w-6 text-primary group-hover:text-white" />
                      </div>
                      <Badge variant="outline" className="text-xs">New Founders</Badge>
                    </div>
                    <CardTitle className="text-2xl">New Tech Entrepreneur Pass</CardTitle>
                    <CardDescription className="text-base">For emerging founders starting their tech journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Start your tech venture in Malaysia</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Access to funding opportunities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Mentorship and networking support</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Co-working space access</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
                  <CardHeader className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                        <TrendingUp className="h-6 w-6 text-primary group-hover:text-white" />
                      </div>
                      <Badge variant="outline" className="text-xs">Seasoned</Badge>
                    </div>
                    <CardTitle className="text-2xl">Experienced Tech Entrepreneur Pass</CardTitle>
                    <CardDescription className="text-base">For seasoned entrepreneurs with proven track records</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Scale your existing business in SEA</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Priority support services</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Strategic partnership opportunities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Government engagement channels</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
                  <CardHeader className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                        <Target className="h-6 w-6 text-primary group-hover:text-white" />
                      </div>
                      <Badge variant="outline" className="text-xs">Investors</Badge>
                    </div>
                    <CardTitle className="text-2xl">Tech Investor Pass</CardTitle>
                    <CardDescription className="text-base">For angel investors and venture capitalists</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Invest in Malaysian tech ecosystem</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Portfolio company support programs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Deal flow access</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Investor community network</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
                  <CardHeader className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                        <UserCheck className="h-6 w-6 text-primary group-hover:text-white" />
                      </div>
                      <Badge variant="outline" className="text-xs">Executives</Badge>
                    </div>
                    <CardTitle className="text-2xl">Senior Management Pass</CardTitle>
                    <CardDescription className="text-base">For C-suite executives and senior leaders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Lead tech companies in Malaysia</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">C-suite and senior management roles</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Flexible work arrangements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Executive networking events</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* DE Rantau Tab */}
          <TabsContent value="derantau" className="space-y-12 animate-in fade-in-50 duration-500">
            {/* Hero Section */}
            <div className="relative rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-12 text-white overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
              <div className="relative z-10 max-w-3xl">
                <Badge className="mb-4 bg-white text-purple-700 border-0">
                  <Plane className="h-3 w-3 mr-1" />
                  Digital Nomad Programme
                </Badge>
                <h2 className="text-5xl font-bold tracking-tight mb-4">
                  DE Rantau
                </h2>
                <p className="text-xl text-white/90 leading-relaxed">
                  Malaysia as your digital nomad hub - work remotely, live vibrantly, and thrive in Southeast Asia
                </p>
                <div className="flex gap-3 mt-8">
                  <Button size="lg" className="bg-white text-purple-700 hover:bg-white/90 shadow-lg cursor-pointer">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 cursor-pointer">
                    Check Eligibility
                  </Button>
                </div>
              </div>
              <div className="absolute -right-20 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
            </div>

            {/* Programs */}
            <div>
              <div className="text-center mb-10">
                <h3 className="text-3xl font-bold mb-3">Why Choose Malaysia</h3>
                <p className="text-gray-500 text-lg">Perfect blend of affordability, connectivity, and lifestyle</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-purple-500/50 bg-gradient-to-br from-white to-purple-50/30 overflow-hidden">
                  <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-purple-100 opacity-50" />
                  <CardHeader className="relative">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Globe className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-xl">DE Rantau Nomad Pass</CardTitle>
                    <CardDescription className="text-base">Work remotely from Malaysia</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-purple-600" />
                        </div>
                        <span className="text-sm">12-month renewable pass</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-purple-600" />
                        </div>
                        <span className="text-sm">For remote professionals</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-purple-600" />
                        </div>
                        <span className="text-sm">Tax benefits available</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-purple-600" />
                        </div>
                        <span className="text-sm">Multiple entry privileges</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-purple-500/50 bg-gradient-to-br from-white to-purple-50/30 overflow-hidden">
                  <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-purple-100 opacity-50" />
                  <CardHeader className="relative">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Building2 className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-xl">DE Rantau Hubs</CardTitle>
                    <CardDescription className="text-base">Coworking and community spaces</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-purple-600" />
                        </div>
                        <span className="text-sm">Premium workspace facilities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-purple-600" />
                        </div>
                        <span className="text-sm">High-speed fiber internet</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-purple-600" />
                        </div>
                        <span className="text-sm">Meeting rooms & facilities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-purple-600" />
                        </div>
                        <span className="text-sm">Strategic locations nationwide</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-purple-500/50 bg-gradient-to-br from-white to-purple-50/30 overflow-hidden">
                  <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-purple-100 opacity-50" />
                  <CardHeader className="relative">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Coffee className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-xl">Digital Nomad Community</CardTitle>
                    <CardDescription className="text-base">Connect with like-minded professionals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-purple-600" />
                        </div>
                        <span className="text-sm">Regular meetups and events</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-purple-600" />
                        </div>
                        <span className="text-sm">Skills workshops & training</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-purple-600" />
                        </div>
                        <span className="text-sm">Cross-border collaboration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-purple-600" />
                        </div>
                        <span className="text-sm">Exclusive member benefits</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                <div className="text-sm text-gray-500">Digital Nomads</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-gray-500">DE Rantau Hubs</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                <div className="text-sm text-gray-500">Monthly Events</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">60+</div>
                <div className="text-sm text-gray-500">Countries</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t mt-24 bg-black text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-3">
                <span className="text-white">M</span>
                <span className="text-primary">DEC</span>
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Malaysia Digital Economy Corporation driving the nation's digital transformation
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-white">Programmes</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors cursor-pointer">Expats Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors cursor-pointer">MTEP</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors cursor-pointer">DE Rantau</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-white">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors cursor-pointer">FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors cursor-pointer">Guidelines</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors cursor-pointer">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-white">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors cursor-pointer">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors cursor-pointer">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors cursor-pointer">Press</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2025 Malaysia Digital Economy Corporation. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors cursor-pointer">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors cursor-pointer">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors cursor-pointer">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;