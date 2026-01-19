import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Cake } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Cake className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline sm:inline-block">
              Sweet Surrender Bakery
            </span>
          </Link>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            <Link href="#products" className="transition-colors hover:text-primary">Products</Link>
            <Link href="#specials" className="transition-colors hover:text-primary">Specials</Link>
            <Link href="#contact" className="transition-colors hover:text-primary">Contact</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <Button>
            Order Online
          </Button>
        </div>
      </div>
    </header>
  );
}
