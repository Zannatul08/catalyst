import Link from "next/link";
import { Button } from "./button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="w-full pt-36 md:pt-48 pb-10">
      <div className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
          <h1>
            Your AI Career Coach for
            <br />
            Professional Success
          </h1>
          <p>
            Advance your career with personalized guidance,interview prep, and
            AI-powered tools for job success.
          </p>
        </div>
        <div>
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg" className="px-8" variant="outline">
              Get Started
            </Button>
          </Link>
        </div>
        <div>
          <div className="">
            <Image
              src={"/banner.jpeg"}
              width={1080}
              height={720}
              alt="Banner catalyst"
              className="rounded-lg border shadow-2xl  mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
