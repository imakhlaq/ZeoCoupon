import { Button } from "@/components/ui/button";
import { ArrowRightIcon, CheckIcon } from "lucide-react";
import Link from "next/link";
import { NeonIcon } from "./icons/NeonIcon";
import { ClerkIcon } from "./icons/ClerkIcon";
import { subscriptionTiersInOrder } from "@/data/subscription";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCompactNum } from "@/lib/formater";
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import BrandLogo from "@/components/BrandLogo";

export default function HomePage() {
  return (
    <>
      <section className="min-h-screen bg-[radial-gradient(hsl(0,72%,65%,40%),hsl(24,62%,73%,40%),hsl(var(--background))_60%)] flex justify-center items-center text-center text-balance flex-col gap-8 px-4">
        <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight m-4">
          Price Smarter, Sell bigger!
        </h1>
        <p className="text-lg lg:text-3xl max-w-screen-xl">
          Optimize your product pricing across countries to maximize sales.
          Capture 85% of the untapped market with location-based dynamic pricing
        </p>
        <Link href={"/signup"}>
          <Button className="text-lg p-6 rounded-xl flex gap-2">
            Get started for free <ArrowRightIcon className="size-5" />
          </Button>
        </Link>
      </section>
      <section className="bg-primary text-primary-foreground">
        <div className="container py-16 flex flex-col gap-16 px-8 md:px-16">
          <h2 className="text-3xl text-center text-balance font-semibold">
            Trusted by top modern companies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-16">
            <Link href={"https://neon.tech"}>
              <NeonIcon />
            </Link>
            <Link href={"https://clerk.tech"}>
              <ClerkIcon />
            </Link>
            <Link href={"https://neon.tech"}>
              <NeonIcon />
            </Link>
            <Link href={"https://clerk.tech"}>
              <ClerkIcon />
            </Link>
            <Link href={"https://neon.tech"}>
              <NeonIcon />
            </Link>
            <Link href={"https://clerk.tech"}>
              <ClerkIcon />
            </Link>
            <Link href={"https://neon.tech"}>
              <NeonIcon />
            </Link>
            <Link href={"https://clerk.tech"}>
              <ClerkIcon />
            </Link>
            <Link href={"https://neon.tech"}>
              <NeonIcon />
            </Link>
            <Link href={"https://clerk.tech"}>
              <ClerkIcon />
            </Link>
            <Link href={"https://neon.tech"}>
              <NeonIcon />
            </Link>
            <Link href={"https://clerk.tech"} className=" md:max-xl:hidden">
              <ClerkIcon />
            </Link>
          </div>
        </div>
      </section>

      <section id="pricing" className="px-8 py-16 bg-accent/5 ">
        <h2 className="text-4xl text-center text-balance font-semibold mb-8">
          Pricing software which pays for itself 20x over
        </h2>
        <div className="grid grid-col-2 lg:grid-cols-4 gap-4 max-w-screen-xl mx-auto">
          {subscriptionTiersInOrder.map((tier) => (
            <PricingCard key={tier.name} {...tier} />
          ))}
        </div>
      </section>
      <footer className=" container pt-16 pb-8 flex sm:flex-col gap-8 sm:gap-4 justify-between items-center">
        <Link href={"/"}>
          <BrandLogo />
        </Link>

        <div className="flex flex-col sm:flex-row gap-8">
          <div className="flex flex-col gap-8"></div>
        </div>
      </footer>
    </>
  );
}

function PricingCard({
  name,
  priceInCents,
  maxNumberOfProducts,
  maxNumberOfVisits,
  canAccessAnalytics,
  canCustomizeBanner,
  canRemoveBranding,
}: (typeof subscriptionTiersInOrder)[number]) {
  //type is determined by object inside the array

  const isMostPopular = name === "Standard";

  return (
    <Card>
      <CardHeader>
        <div className="text-accent font-semibold mb-8">{name}</div>
        <CardTitle className="text-xl font-bold">
          ${priceInCents / 100} /mo
        </CardTitle>
        <CardDescription>
          {formatCompactNum(maxNumberOfVisits)} pricing page visits/mo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={"/signup"}>
          <Button
            className="text-lg w-full rounded-lg"
            variant={isMostPopular ? "accent" : "default"}
          >
            Get Started
          </Button>
        </Link>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 items-start">
        <Feature className="font-bold">
          {maxNumberOfProducts}{" "}
          {maxNumberOfProducts === 1 ? "product" : "proucts"}
        </Feature>
        <Feature>Zeo Discount</Feature>
        {canAccessAnalytics ? <Feature>Advance analytics</Feature> : null}
        {canRemoveBranding ? <Feature>Remove Easy ZeoCoupoun</Feature> : null}
        {canCustomizeBanner ? <Feature>Banner Customization</Feature> : null}
      </CardFooter>
    </Card>
  );
}

function Feature({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <CheckIcon className="size-4 stroke-accent bg-accent/25 rounded-full p-0.5" />
    </div>
  );
}
