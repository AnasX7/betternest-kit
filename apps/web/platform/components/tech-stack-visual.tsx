import Image from 'next/image';
import Bolt from '@/assets/bolt.svg';
import BetterAuthDark from '@/assets/Better Auth_dark.svg';
import BetterAuthLight from '@/assets/Better Auth_light.svg';
import PrismaDark from '@/assets/Prisma_dark.svg';
import PrismaLight from '@/assets/Prisma_light.svg';
import Expo from '@/assets/expo.svg';
import NestJs from '@/assets/nestjs.svg';
import NextJsDark from '@/assets/nextjs_icon_dark.svg';
import Orpc from '@/assets/orpc.webp';
import Tailwind from '@/assets/tailwindcss.svg';

export function TechStackVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-10">
      {/* Central Bolt */}
      <div className="relative z-10 h-40 w-40 md:h-56 md:w-56 animate-float">
        <Image src={Bolt} alt="Bolt" fill className="object-contain" priority />
      </div>

      {/* Floating Icons */}

      {/* Better Auth - Top Left */}
      <div className="absolute top-[15%] left-[10%] h-15 w-31 animate-float [animation-delay:1s] opacity-80 hover:opacity-100 transition-opacity">
        <Image
          src={BetterAuthDark}
          alt="Better Auth"
          fill
          className="hidden dark:block object-contain"
        />
        <Image
          src={BetterAuthLight}
          alt="Better Auth"
          fill
          className="block dark:hidden object-contain"
        />
      </div>

      {/* Prisma - Bottom Right */}
      <div className="absolute bottom-[20%] right-[10%] h-16 w-28 animate-float [animation-delay:2s] opacity-80 hover:opacity-100 transition-opacity">
        <Image
          src={PrismaDark}
          alt="Prisma"
          fill
          className="hidden dark:block object-contain"
        />
        <Image
          src={PrismaLight}
          alt="Prisma"
          fill
          className="block dark:hidden object-contain"
        />
      </div>

      {/* Next.js - Top Right */}
      <div className="absolute top-[20%] right-[15%] h-16 w-16 animate-float [animation-delay:1.5s] opacity-80 hover:opacity-100 transition-opacity">
        {/* Assuming NextJsDark is white (for dark mode), invert for light mode */}
        <Image
          src={NextJsDark}
          alt="Next.js"
          fill
          className="object-contain invert-0 dark:invert"
        />
      </div>

      {/* NestJS - Bottom Left */}
      <div className="absolute bottom-[15%] left-[15%] h-18 w-18 animate-float [animation-delay:0.5s] opacity-80 hover:opacity-100 transition-opacity">
        <Image src={NestJs} alt="NestJS" fill className="object-contain" />
      </div>

      {/* Tailwind - Middle Left */}
      <div className="absolute top-1/2 left-[5%] h-20 w-20 -translate-y-1/2 animate-float [animation-delay:2.5s] opacity-80 hover:opacity-100 transition-opacity">
        <Image
          src={Tailwind}
          alt="Tailwind CSS"
          fill
          className="object-contain"
        />
      </div>

      {/* Expo - Top Center-ish */}
      {/* <div className="absolute top-[10%] left-1/2 h-8 w-8 -translate-x-1/2 animate-float [animation-delay:3s] opacity-80 hover:opacity-100 transition-opacity"> */}
        {/* Expo is usually black, invert for dark mode */}
        {/* <Image
          src={Expo}
          alt="Expo"
          fill
          className="object-contain invert-0 dark:invert"
        /> */}
      {/* </div> */}

      {/* oRPC - Middle Right */}
      <div className="absolute top-1/2 right-[5%] h-24 w-24 -translate-y-1/2 animate-float [animation-delay:1.2s] opacity-80 hover:opacity-100 transition-opacity">
        <Image src={Orpc} alt="oRPC" fill className="object-contain" />
      </div>
    </div>
  );
}
