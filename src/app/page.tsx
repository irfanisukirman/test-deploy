import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { Clock, MapPin, Phone } from 'lucide-react';
import { FlavorGenerator } from '@/components/flavor-generator';

const getImage = (id: string): ImagePlaceholder => {
  const image = PlaceHolderImages.find(img => img.id === id);
  if (!image) {
    // Return a default or throw an error
    return {
      id: 'default',
      description: 'Placeholder',
      imageUrl: 'https://picsum.photos/seed/default/400/300',
      imageHint: 'placeholder'
    };
  }
  return image;
}

const products = [
  {
    id: 'product-sourdough',
    name: 'Artisan Sourdough',
    description: 'Naturally leavened bread with a crisp crust and a soft, airy crumb. Perfect for sandwiches or toast.',
  },
  {
    id: 'product-cupcake',
    name: 'Velvet Cupcakes',
    description: 'A classic red velvet cupcake with a light, fluffy cream cheese frosting. An elegant treat for any occasion.',
  },
  {
    id: 'product-macaron',
    name: 'French Macarons',
    description: 'Delicate almond meringue cookies with a variety of flavorful fillings. A colorful and delightful indulgence.',
  },
  {
    id: 'product-eclair',
    name: 'Chocolate Éclair',
    description: 'A delicate choux pastry filled with rich vanilla cream and topped with a glossy chocolate glaze.',
  },
];

export default function Home() {
  const heroImage = getImage('hero-croissant');
  const specialImage = getImage('special-cake');
  const mapImage = getImage('map-location');

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px] w-full">
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
            <h1 className="text-4xl font-extrabold tracking-tight font-headline sm:text-5xl md:text-6xl">
              Sweet Surrender Bakery
            </h1>
            <p className="mt-4 max-w-lg text-lg text-primary-foreground/90">
              Where every bite is a moment of pure bliss.
            </p>
            <Button size="lg" className="mt-8">
              Explore Our Menu
            </Button>
          </div>
        </section>

        {/* Product Showcase */}
        <section id="products" className="py-12 md:py-24">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tighter text-center font-headline sm:text-4xl md:text-5xl">
              Our Signature Bakes
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-center text-muted-foreground md:text-xl/relaxed">
              Crafted with love, the finest ingredients, and a pinch of magic.
            </p>
            <div className="grid grid-cols-1 gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => {
                const productImage = getImage(product.id);
                return (
                  <Card key={product.name} className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <CardHeader className="p-0">
                      <Image
                        src={productImage.imageUrl}
                        alt={productImage.description}
                        data-ai-hint={productImage.imageHint}
                        width={400}
                        height={300}
                        className="object-cover w-full h-48"
                      />
                    </CardHeader>
                    <CardContent className="p-6">
                      <CardTitle className="font-headline">{product.name}</CardTitle>
                      <p className="mt-2 text-sm text-muted-foreground">{product.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Daily Specials */}
        <section id="specials" className="py-12 md:py-24 bg-accent/50">
          <div className="container">
            <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-16">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">Daily Special</div>
                <h2 className="text-3xl font-bold tracking-tighter font-headline sm:text-4xl">
                  Decadent Chocolate Dream Cake
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed">
                  Indulge in today's special: layers of moist chocolate cake and rich fudge frosting, topped with chocolate shavings. Available for a limited time only!
                </p>
                <Button>Order Now</Button>
              </div>
              <div className="flex justify-center">
                <Image
                  src={specialImage.imageUrl}
                  alt={specialImage.description}
                  data-ai-hint={specialImage.imageHint}
                  width={500}
                  height={500}
                  className="overflow-hidden rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Flavor Description Tool */}
        <section id="ai-tool" className="py-12 md:py-24">
            <div className="container">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tighter text-center font-headline sm:text-4xl md:text-5xl">
                        Generate Your Own Descriptions
                    </h2>
                    <p className="max-w-2xl mx-auto mt-4 text-center text-muted-foreground md:text-xl/relaxed">
                        Use our AI tool to see how we turn customer feedback into mouth-watering descriptions for our menu.
                    </p>
                </div>
                <div className="mt-12">
                    <FlavorGenerator />
                </div>
            </div>
        </section>


        {/* Contact Information */}
        <section id="contact" className="py-12 md:py-24 border-t">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tighter text-center font-headline sm:text-4xl md:text-5xl">
              Visit Us
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-center text-muted-foreground md:text-xl/relaxed">
              We can't wait to welcome you. Find us here!
            </p>
            <div className="grid gap-12 mt-12 md:grid-cols-2">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 mt-1 text-primary" />
                  <div>
                    <h3 className="font-semibold">Our Address</h3>
                    <p className="text-muted-foreground">123 Cookie Lane, Pastryville, CA 90210</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 mt-1 text-primary" />
                  <div>
                    <h3 className="font-semibold">Call Us</h3>
                    <p className="text-muted-foreground">(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 mt-1 text-primary" />
                  <div>
                    <h3 className="font-semibold">Business Hours</h3>
                    <ul className="text-muted-foreground">
                      <li>Monday - Friday: 7am - 6pm</li>
                      <li>Saturday: 8am - 5pm</li>
                      <li>Sunday: Closed</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={mapImage.imageUrl}
                  alt={mapImage.description}
                  data-ai-hint={mapImage.imageHint}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
