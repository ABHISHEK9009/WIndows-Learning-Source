"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { MentorCard } from "@/components/mentor-card"
import { ParticleBackground } from "@/components/particle-background"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "@/components/login-form"
import { RegisterForm } from "@/components/register-form"
import { PostRequirementForm } from "@/components/post-requirement-form"
import {
  Search,
  ChevronDown,
  ArrowRight,
  Star,
  Play,
  MessageSquare,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowUp,
} from "lucide-react"

// Mock data for featured mentors
const featuredMentors = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    expertise: ["Data Science", "Machine Learning", "Python"],
    rating: 4.9,
    reviewCount: 124,
    hourlyRate: 1500,
    currency: "₹",
    avatar: "/placeholder.svg?height=80&width=80&text=SC",
  },
  {
    id: 2,
    name: "Raj Patel",
    expertise: ["React.js", "D3.js", "JavaScript"],
    rating: 4.8,
    reviewCount: 98,
    hourlyRate: 1200,
    currency: "₹",
    avatar: "/placeholder.svg?height=80&width=80&text=RP",
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    expertise: ["UX Design", "UI Design", "Figma"],
    rating: 4.7,
    reviewCount: 87,
    hourlyRate: 1300,
    currency: "₹",
    avatar: "/placeholder.svg?height=80&width=80&text=MR",
  },
  {
    id: 4,
    name: "Alex Johnson",
    expertise: ["iOS", "Android", "React Native"],
    rating: 4.6,
    reviewCount: 76,
    hourlyRate: 1400,
    currency: "₹",
    avatar: "/placeholder.svg?height=80&width=80&text=AJ",
  },
]

// Mock data for testimonials
const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Software Engineer",
    quote:
      "Windows Learning transformed my career. The personalized mentorship helped me master React and land my dream job at a top tech company.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60&text=PS",
    videoUrl: "#",
    mentorId: 2,
  },
  {
    id: 2,
    name: "Rahul Gupta",
    role: "Data Scientist",
    quote:
      "The mentors here are world-class. My mentor guided me through complex machine learning concepts and helped me build a portfolio that stands out.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60&text=RG",
    videoUrl: "#",
    mentorId: 1,
  },
  {
    id: 3,
    name: "Ananya Patel",
    role: "UX Designer",
    quote:
      "I was struggling with design principles until I found my mentor on Windows Learning. The 1-on-1 sessions were exactly what I needed to improve my skills.",
    rating: 4,
    avatar: "/placeholder.svg?height=60&width=60&text=AP",
    videoUrl: "#",
    mentorId: 3,
  },
]

// Popular search terms
const popularSearchTerms = [
  "Web Development",
  "Data Science",
  "UI/UX Design",
  "Machine Learning",
  "Mobile Development",
  "Cloud Computing",
  "Blockchain",
  "Digital Marketing",
]

export default function HomePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isRequirementModalOpen, setIsRequirementModalOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [showTranscript, setShowTranscript] = useState(false)

  // Handle scroll events for fixed header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  // Handle newsletter subscription
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingEmail(true)

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      setIsSubmittingEmail(false)
      return
    }

    // Mock API call to /api/subscribe
    setTimeout(() => {
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      })
      setEmail("")
      setIsSubmittingEmail(false)
    }, 1000)
  }

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header
        className={`sticky top-0 z-50 w-full border-b ${isScrolled ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" : "bg-background"}`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold">Windows Learning</span>
              </Link>
              <nav className="hidden ml-10 space-x-8 md:flex">
                <Link href="/" className="text-sm font-medium hover:text-primary">
                  Home
                </Link>
                <Link href="/search" className="text-sm font-medium hover:text-primary">
                  Find Mentors
                </Link>
                <div className="relative group">
                  <button className="flex items-center text-sm font-medium hover:text-primary">
                    Skills <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-background border hidden group-hover:block">
                    <div className="py-1">
                      <Link href="/skills/technology" className="block px-4 py-2 text-sm hover:bg-muted">
                        Technology
                      </Link>
                      <Link href="/skills/business" className="block px-4 py-2 text-sm hover:bg-muted">
                        Business
                      </Link>
                      <Link href="/skills/design" className="block px-4 py-2 text-sm hover:bg-muted">
                        Design
                      </Link>
                    </div>
                  </div>
                </div>
                <Link href="/resources" className="text-sm font-medium hover:text-primary">
                  Resources
                </Link>
                <Link href="/become-mentor" className="text-sm font-medium hover:text-primary">
                  Become a Mentor
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />

              {user ? (
                <div className="flex items-center space-x-4">
                  <Link
                    href={user.role === "learner" ? "/learner/dashboard" : "/mentor/dashboard"}
                    className="text-sm font-medium hover:text-primary"
                  >
                    Dashboard
                  </Link>
                  <div className="relative group">
                    <button className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium hidden md:inline-block">{user.name}</span>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-background border hidden group-hover:block">
                      <div className="py-1">
                        <Link href={`/${user.role}/dashboard`} className="block px-4 py-2 text-sm hover:bg-muted">
                          Dashboard
                        </Link>
                        <Link href={`/${user.role}/settings`} className="block px-4 py-2 text-sm hover:bg-muted">
                          Settings
                        </Link>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-muted"
                          onClick={() => {
                            // Logout logic
                          }}
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Sign In</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Sign In</DialogTitle>
                        <DialogDescription>Enter your credentials to access your account.</DialogDescription>
                      </DialogHeader>
                      <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="login">Login</TabsTrigger>
                          <TabsTrigger value="register">Register</TabsTrigger>
                        </TabsList>
                        <TabsContent value="login">
                          <LoginForm />
                        </TabsContent>
                        <TabsContent value="register">
                          <RegisterForm />
                        </TabsContent>
                      </Tabs>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Join Free</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create an Account</DialogTitle>
                        <DialogDescription>Join Windows Learning to connect with expert mentors.</DialogDescription>
                      </DialogHeader>
                      <RegisterForm />
                    </DialogContent>
                  </Dialog>
                </div>
              )}
              <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4">
                <Link href="/" className="text-sm font-medium hover:text-primary">
                  Home
                </Link>
                <Link href="/search" className="text-sm font-medium hover:text-primary">
                  Find Mentors
                </Link>
                <details className="group">
                  <summary className="flex items-center text-sm font-medium hover:text-primary cursor-pointer">
                    Skills <ChevronDown className="ml-1 h-4 w-4" />
                  </summary>
                  <div className="mt-2 ml-4 space-y-2">
                    <Link href="/skills/technology" className="block text-sm hover:text-primary">
                      Technology
                    </Link>
                    <Link href="/skills/business" className="block text-sm hover:text-primary">
                      Business
                    </Link>
                    <Link href="/skills/design" className="block text-sm hover:text-primary">
                      Design
                    </Link>
                  </div>
                </details>
                <Link href="/resources" className="text-sm font-medium hover:text-primary">
                  Resources
                </Link>
                <Link href="/become-mentor" className="text-sm font-medium hover:text-primary">
                  Become a Mentor
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 hero-gradient-light dark:hero-gradient-dark overflow-hidden">
          <ParticleBackground />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="animate-float mb-8">
                <svg width="200" height="120" viewBox="0 0 200 120" className="mx-auto">
                  <circle cx="60" cy="60" r="20" fill="rgba(74, 107, 255, 0.3)" />
                  <circle cx="140" cy="60" r="20" fill="rgba(74, 107, 255, 0.3)" />
                  <rect x="70" y="40" width="60" height="40" rx="5" fill="rgba(74, 107, 255, 0.5)" />
                  <circle cx="90" cy="60" r="5" fill="#fff" />
                  <circle cx="110" cy="60" r="5" fill="#fff" />
                </svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Unlock Your Potential with Expert Mentors</h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Connect with industry professionals for personalized 1-on-1 guidance tailored to your learning journey.
              </p>
              <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="What do you want to learn?"
                    className="pl-10 pr-20 py-6 text-base"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button type="submit" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                    Search
                  </Button>
                </div>
              </form>
              <div className="flex flex-wrap justify-center gap-2">
                {popularSearchTerms.slice(0, 6).map((term) => (
                  <Badge
                    key={term}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => {
                      setSearchQuery(term)
                      router.push(`/search?q=${encodeURIComponent(term)}`)
                    }}
                  >
                    {term}
                  </Badge>
                ))}
              </div>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="btn-primary" asChild>
                  <Link href="/search">
                    Find Your Mentor <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    if (user) {
                      setIsRequirementModalOpen(true)
                    } else {
                      setIsLoginModalOpen(true)
                    }
                  }}
                >
                  Post Learning Request
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Mentors Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Featured Mentors</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Connect with our top-rated mentors who are ready to help you achieve your goals.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredMentors.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Button variant="outline" size="lg" asChild>
                <Link href="/search">Browse All Mentors</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our simple process makes it easy to connect with mentors and start learning.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="relative">
                  <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-primary" />
                  </div>
                  <div className="absolute top-8 left-full h-0.5 w-full bg-primary/20 hidden md:block" />
                </div>
                <h3 className="text-xl font-bold mb-2">Find Your Mentor</h3>
                <p className="text-muted-foreground">
                  Search for mentors based on skills, experience, and ratings to find the perfect match.
                </p>
              </div>
              <div className="text-center">
                <div className="relative">
                  <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-8 w-8 text-primary" />
                  </div>
                  <div className="absolute top-8 left-full h-0.5 w-full bg-primary/20 hidden md:block" />
                </div>
                <h3 className="text-xl font-bold mb-2">Schedule Sessions</h3>
                <p className="text-muted-foreground">
                  Book 1-on-1 sessions at times that work for you and your mentor's schedule.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Grow Your Skills</h3>
                <p className="text-muted-foreground">
                  Learn, practice, and receive feedback to accelerate your skill development.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Hear from learners who have transformed their skills with Windows Learning.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-muted rounded-lg p-4 relative overflow-hidden" style={{ minHeight: "300px" }}>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                    <Button variant="outline" className="bg-background/80 hover:bg-background">
                      <Play className="mr-2 h-4 w-4" /> Play Video
                    </Button>
                  </div>
                  <div data-mentor-id={testimonials[activeTestimonial].mentorId} className="hidden">
                    Video testimonial
                  </div>
                </div>
                <div>
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <Avatar className="h-12 w-12 mr-4">
                        <AvatarImage
                          src={testimonials[activeTestimonial].avatar}
                          alt={testimonials[activeTestimonial].name}
                        />
                        <AvatarFallback>{testimonials[activeTestimonial].name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-bold text-lg">{testimonials[activeTestimonial].name}</h3>
                        <p className="text-sm text-muted-foreground">{testimonials[activeTestimonial].role}</p>
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < testimonials[activeTestimonial].rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <blockquote className="italic text-lg mb-4">"{testimonials[activeTestimonial].quote}"</blockquote>
                    <Button variant="ghost" size="sm" onClick={() => setShowTranscript(!showTranscript)}>
                      {showTranscript ? "Hide Transcript" : "Show Transcript"}
                    </Button>
                    {showTranscript && (
                      <div className="mt-4 p-4 bg-muted rounded-lg text-sm">
                        <p>Full transcript of the video testimonial...</p>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        className={`h-2 rounded-full transition-all ${
                          activeTestimonial === index ? "w-8 bg-primary" : "w-2 bg-muted"
                        }`}
                        onClick={() => setActiveTestimonial(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Career?</h2>
              <p className="text-lg md:text-xl mb-8 text-primary-foreground/80">
                Join thousands of learners who are accelerating their growth with personalized mentorship.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/search">Find Your Mentor Today</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Subscribe to our newsletter for the latest learning resources, mentor spotlights, and exclusive offers.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" disabled={isSubmittingEmail}>
                  {isSubmittingEmail ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">For Learners</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/search" className="text-sm hover:text-primary">
                    Find Mentors
                  </Link>
                </li>
                <li>
                  <Link href="/learner/post-requirement" className="text-sm hover:text-primary">
                    Post Requirements
                  </Link>
                </li>
                <li>
                  <Link href="/learner/sessions" className="text-sm hover:text-primary">
                    Book Sessions
                  </Link>
                </li>
                <li>
                  <Link href="/learner/wallet" className="text-sm hover:text-primary">
                    Wallet & Payments
                  </Link>
                </li>
                <li>
                  <Link href="/app/help-support" className="text-sm hover:text-primary">
                    Help & Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">For Mentors</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/become-mentor" className="text-sm hover:text-primary">
                    Become a Mentor
                  </Link>
                </li>
                <li>
                  <Link href="/mentor/learner-requests" className="text-sm hover:text-primary">
                    Learner Requests
                  </Link>
                </li>
                <li>
                  <Link href="/mentor/earnings" className="text-sm hover:text-primary">
                    Earnings
                  </Link>
                </li>
                <li>
                  <Link href="/mentor/profile" className="text-sm hover:text-primary">
                    Profile Settings
                  </Link>
                </li>
                <li>
                  <Link href="/mentor/help" className="text-sm hover:text-primary">
                    Mentor Resources
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-sm hover:text-primary">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/press" className="text-sm hover:text-primary">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm hover:text-primary">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-sm hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-sm hover:text-primary">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="/accessibility" className="text-sm hover:text-primary">
                    Accessibility
                  </Link>
                </li>
                <li>
                  <Link href="/mentor-terms" className="text-sm hover:text-primary">
                    Mentor Terms v2.1
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-muted-foreground">© 2025 Windows Learning. All rights reserved.</p>
              </div>
              <div className="flex space-x-4">
                <Link href="https://twitter.com" className="text-muted-foreground hover:text-primary">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="https://facebook.com" className="text-muted-foreground hover:text-primary">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="https://instagram.com" className="text-muted-foreground hover:text-primary">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="https://linkedin.com" className="text-muted-foreground hover:text-primary">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </footer>

      {/* Login Modal */}
      <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In Required</DialogTitle>
            <DialogDescription>You need to sign in to post a learning requirement.</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Post Requirement Modal */}
      <Dialog open={isRequirementModalOpen} onOpenChange={setIsRequirementModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Post a Learning Requirement</DialogTitle>
            <DialogDescription>
              Describe what you want to learn and get personalized proposals from qualified mentors.
            </DialogDescription>
          </DialogHeader>
          <PostRequirementForm onSuccess={() => setIsRequirementModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

