import { Button } from '@repo/ui/components/button';
import Image, { type ImageProps } from 'next/image';
import { api } from '@/lib/api-client';
import { AnimatedThemeToggler } from '@repo/ui/components/animated-theme-toggler';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

type Props = Omit<ImageProps, 'src'> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="dark:hidden" />
      <Image {...rest} src={srcDark} className="hidden dark:block" />
    </>
  );
};

async function checkApiConnection(): Promise<boolean> {
  try {
    const res = await api.hello.get();
    return !!res.message;
  } catch (error) {
    console.error('Error connecting to API:', error);
    return false;
  }
}

export default async function Home() {
  const isApiConnected = await checkApiConnection();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-svh p-8 pb-20 gap-16 sm:p-20 font-sans">
      <div className="absolute top-4 right-4">
        <AnimatedThemeToggler />
      </div>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ThemeImage
          className="dark:invert"
          srcLight="/turborepo-dark.svg"
          srcDark="/turborepo-light.svg"
          alt="Turborepo logo"
          width={180}
          height={38}
          preload
        />

        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-mono">
          <li className="mb-2">
            Get started by editing{' '}
            <code className="bg-black/5 dark:bg-white/6 px-1 py-0.5 rounded font-semibold">
              apps/web/platform/app/page.tsx
            </code>
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new/clone?demo-description=Learn+to+implement+a+monorepo+with+a+two+Next.js+sites+that+has+installed+three+local+packages.&demo-image=%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F4K8ZISWAzJ8X1504ca0zmC%2F0b21a1c6246add355e55816278ef54bc%2FBasic.png&demo-title=Monorepo+with+Turborepo&demo-url=https%3A%2F%2Fexamples-basic-web.vercel.sh%2F&from=templates&project-name=Monorepo+with+Turborepo&repository-name=monorepo-turborepo&repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fturborepo%2Ftree%2Fmain%2Fexamples%2Fbasic&root-directory=apps%2Fdocs&skippable-integrations=1&teamSlug=vercel&utm_source=create-turbo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://turborepo.com/docs?utm_source"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-solid border-black/8 dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          >
            Read our docs
          </a>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row w-full justify-center">
          <Button asChild variant="default" className="w-full sm:w-auto">
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <div className="flex items-center gap-3 p-4 rounded-xl border border-black/8 dark:border-white/[.145] bg-black/5 dark:bg-white/6 text-sm transition-all hover:border-black/8 dark:hover:border-white/[.145] hover:-translate-y-px">
            <div
              className={`w-2 h-2 rounded-full shrink-0 ${
                isApiConnected
                  ? 'bg-emerald-500 shadow-[0_0_0_0_rgba(16,185,129,0.4)] animate-pulse'
                  : 'bg-red-500 shadow-[0_0_0_0_rgba(239,68,68,0.4)]'
              }`}
            />
            <div>
              <div className="font-medium opacity-90">
                {isApiConnected ? 'API Connected' : 'API Disconnected'}
              </div>
              {!isApiConnected && (
                <div className="opacity-60 text-[13px]">
                  Start the NestJS server on port 3000
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?search=turborepo&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://turborepo.com?utm_source=create-turbo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to turborepo.com →
        </a>
      </footer>
    </div>
  );
}
