import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import TopTicker from "../../components/TopPicker/TopPicker";
import Navbar from "../../components/Navbar/Navbar3";
import Footer from "../../components/Footer/Footer";
import GoUp from "../../components/Buttons/GoUp";
import ChatButton from "../../components/Buttons/ChatButton";
import { getPostBySlug, getPosts } from "../../data/blogs/readPosts";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Blog | Las Vegas Designs USA" };
  return {
    title: `${post.title} | Las Vegas Designs USA Blog`,
    description: post.excerpt || post.title,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="bg-white">
      <TopTicker />
      <Navbar />

      {/* Hero with featured image */}
      <section className="relative w-full aspect-video max-h-[500px] bg-gray-200">
        <Image
          src={post.featuredImage || "/assets/images/hat/stitch/hat embroidery logo digitizing sewout (12).png"}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pb-8">
            <p className="text-white/90 text-sm mb-1">
              {post.category} • {post.date} • {post.readTime}
            </p>
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 md:py-14">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-gray max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {post.content}
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-gray-200">
            <Link
              href="/blog"
              className="text-lv-red font-semibold hover:underline"
            >
              ← Back to all posts
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <GoUp />
      <ChatButton />
    </main>
  );
}
