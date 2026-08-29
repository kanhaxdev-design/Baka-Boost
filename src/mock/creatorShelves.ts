import productOne from "@/imports/p1.jpg.jpg";
import productTwo from "@/imports/p2.jpg.jpg";
import productThree from "@/imports/p3.jpg.jpg";
import productFour from "@/imports/p4.jpg";
import productFive from "@/imports/p5.jpg";

export type ProductPick = {
  id: string;
  name: string;
  price: string;
  note: string;
  category: "Desk" | "Creative" | "Style" | "Wellness";
  image: string;
  affiliateUrl: string;
};

export type CreatorShelfData = {
  id: string;
  displayName: string;
  handle: string;
  followers: string;
  avatar: string;
  products: ProductPick[];
};

const amazonSearch = (query: string) => `https://www.amazon.com/s?k=${encodeURIComponent(query)}`;

export const creatorShelves: CreatorShelfData[] = [
  {
    id: "mina-makes",
    displayName: "Mina Park",
    handle: "minamakes",
    followers: "18.4k",
    avatar: productTwo,
    products: [
      { id: "mina-1", name: "Instax Mini 12", price: "$79.00", note: "For turning ordinary studio days into tiny keepsakes.", category: "Creative", image: productTwo, affiliateUrl: amazonSearch("Instax Mini 12") },
      { id: "mina-2", name: "Softbox desk light", price: "$42.99", note: "The warmest light I have found for late-night making.", category: "Desk", image: productThree, affiliateUrl: amazonSearch("softbox desk light") },
      { id: "mina-3", name: "Sony WH-1000XM5", price: "$349.00", note: "My focus switch when the house gets noisy.", category: "Wellness", image: productOne, affiliateUrl: amazonSearch("Sony WH-1000XM5") },
      { id: "mina-4", name: "Canvas artist tote", price: "$35.00", note: "Carries every sketchbook, cable, and half-finished idea.", category: "Style", image: productFive, affiliateUrl: amazonSearch("canvas artist tote") },
    ],
  },
  {
    id: "theo-studio",
    displayName: "Theo Alvarez",
    handle: "theostudio",
    followers: "9.7k",
    avatar: productFour,
    products: [
      { id: "theo-1", name: "Blue Yeti Nano", price: "$99.00", note: "A forgiving mic for voice notes and quiet podcasts.", category: "Creative", image: productFour, affiliateUrl: amazonSearch("Blue Yeti Nano") },
      { id: "theo-2", name: "MX Keys Mini", price: "$99.00", note: "Small enough for my travel desk, satisfying enough for long edits.", category: "Desk", image: productThree, affiliateUrl: amazonSearch("Logitech MX Keys Mini") },
      { id: "theo-3", name: "Studio headphones", price: "$149.00", note: "Honest sound without making a tiny studio feel crowded.", category: "Wellness", image: productOne, affiliateUrl: amazonSearch("studio headphones") },
      { id: "theo-4", name: "Cable catch-all pouch", price: "$19.00", note: "The unglamorous pick that saves every shoot day.", category: "Style", image: productFive, affiliateUrl: amazonSearch("cable organizer pouch") },
      { id: "theo-5", name: "Portable SSD", price: "$89.00", note: "Fast backups before I leave a location.", category: "Creative", image: productThree, affiliateUrl: amazonSearch("portable SSD") },
    ],
  },
  {
    id: "jules-home",
    displayName: "Jules Okafor",
    handle: "juleshome",
    followers: "31.2k",
    avatar: productFive,
    products: [
      { id: "jules-1", name: "Everyday canvas tote", price: "$35.00", note: "A good-looking workhorse for market mornings.", category: "Style", image: productFive, affiliateUrl: amazonSearch("everyday canvas tote") },
      { id: "jules-2", name: "Instant camera", price: "$79.00", note: "Makes hosting feel like an occasion, even on a Tuesday.", category: "Creative", image: productTwo, affiliateUrl: amazonSearch("instant camera") },
      { id: "jules-3", name: "Quiet desk headphones", price: "$349.00", note: "For protecting a little pocket of calm in a busy home.", category: "Wellness", image: productOne, affiliateUrl: amazonSearch("noise cancelling headphones") },
      { id: "jules-4", name: "Mini desk keyboard", price: "$99.00", note: "A tidy little upgrade that makes admin less dreary.", category: "Desk", image: productThree, affiliateUrl: amazonSearch("mini wireless keyboard") },
    ],
  },
  {
    id: "remy-draws",
    displayName: "Remy Chen",
    handle: "remydraws",
    followers: "6.8k",
    avatar: productThree,
    products: [
      { id: "remy-1", name: "Creator headphones", price: "$149.00", note: "My favorite companion for coloring sessions.", category: "Wellness", image: productOne, affiliateUrl: amazonSearch("creator headphones") },
      { id: "remy-2", name: "Compact keyboard", price: "$99.00", note: "Leaves more room for paper, swatches, and snacks.", category: "Desk", image: productThree, affiliateUrl: amazonSearch("compact wireless keyboard") },
      { id: "remy-3", name: "Pocket instant camera", price: "$79.00", note: "Reference photos, but make them sentimental.", category: "Creative", image: productTwo, affiliateUrl: amazonSearch("pocket instant camera") },
      { id: "remy-4", name: "Utility tote", price: "$35.00", note: "The studio bag that survives paint, rain, and train rides.", category: "Style", image: productFive, affiliateUrl: amazonSearch("utility tote bag") },
      { id: "remy-5", name: "USB studio mic", price: "$99.00", note: "For process videos when I want setup to stay simple.", category: "Creative", image: productFour, affiliateUrl: amazonSearch("USB studio microphone") },
    ],
  },
  {
    id: "sol-cooks",
    displayName: "Sol Rivera",
    handle: "solcooks",
    followers: "22.1k",
    avatar: productOne,
    products: [
      { id: "sol-1", name: "Kitchen day headphones", price: "$349.00", note: "A little music makes prep feel like a ritual.", category: "Wellness", image: productOne, affiliateUrl: amazonSearch("kitchen noise cancelling headphones") },
      { id: "sol-2", name: "Recipe note camera", price: "$79.00", note: "For saving the messy, beautiful first attempts.", category: "Creative", image: productTwo, affiliateUrl: amazonSearch("instant camera") },
      { id: "sol-3", name: "Countertop speaker", price: "$49.00", note: "Good sound, tiny footprint, no preciousness.", category: "Desk", image: productFour, affiliateUrl: amazonSearch("compact countertop speaker") },
      { id: "sol-4", name: "Market tote", price: "$35.00", note: "The one I bring when I promise myself I will buy less.", category: "Style", image: productFive, affiliateUrl: amazonSearch("market canvas tote") },
    ],
  },
];
