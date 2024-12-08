import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 md:py-32 text-center relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/60 via-primary/30 to-transparent opacity-20"></div>
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          Unlock Your Coding Potential
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
          Join our comprehensive web development course and transform your
          skills into a rewarding career.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button size="lg" className="px-8">
            Get Started
          </Button>
          <Button size="lg" variant="outline" className="px-8">
            Learn More
          </Button>
        </div>
      </section>

      {/* Course Highlights */}
      <section className="bg-secondary py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Course Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "Comprehensive Curriculum",
              "Expert Mentors",
              "Real-World Projects",
            ].map((highlight, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle>{highlight}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Build real-world skills with interactive lessons and
                    industry-focused projects.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Flashcards Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Interactive Flashcards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                question: "What is React?",
                answer:
                  "React is a JavaScript library for building user interfaces.",
              },
              {
                question: "What is a component?",
                answer:
                  "A component is a reusable piece of UI in a React application.",
              },
              {
                question: "What is JSX?",
                answer:
                  "JSX is a syntax extension for JavaScript that looks similar to HTML.",
              },
            ].map((flashcard, index) => (
              <Card
                key={index}
                className="hover:bg-primary/10 transition-colors"
              >
                <CardHeader>
                  <CardTitle className="text-lg">
                    {flashcard.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{flashcard.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            What Our Students Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "John Doe",
                role: "Frontend Developer",
                quote: "This course changed my life!",
              },
              {
                name: "Jane Smith",
                role: "Full Stack Engineer",
                quote: "Highly recommend for aspiring developers!",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">
                    "{testimonial.quote}"
                  </p>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Simple, Transparent Pricing
          </h2>
          <div className="max-w-lg mx-auto">
            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl">Full Course Access</CardTitle>
                <CardDescription>
                  Everything you need to succeed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-5xl font-bold mb-4">₹499</p>
                <ul className="space-y-2">
                  {["6-month access", "Live Q&A", "Completion Certificate"].map(
                    (feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-2 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        {feature}
                      </li>
                    )
                  )}
                </ul>
                <Button className="w-full mt-6">Enroll Now</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            &copy; 2023 Web Development Course. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
