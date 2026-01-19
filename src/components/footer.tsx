import Link from 'next/link';
import { Facebook, Instagram, Twitter, Cake } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary/50">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="flex items-center space-x-2">
            <Cake className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold font-headline">
              Sweet Surrender Bakery
            </span>
          </Link>
          <p className="max-w-md mx-auto mt-4 text-muted-foreground">
            Freshly baked happiness, delivered daily.
          </p>
          <div className="flex justify-center mt-6 space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-primary" aria-label="Facebook">
              <Facebook />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary" aria-label="Instagram">
              <Instagram />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary" aria-label="Twitter">
              <Twitter />
            </Link>
          </div>
        </div>
        <hr className="my-6 border-border" />
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Sweet Surrender Bakery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
