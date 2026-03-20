import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import TopTicker from "../../components/TopPicker/TopPicker";
import Navbar from "../../components/Navbar/Navbar3";
import Footer from "../../components/Footer/Footer";
import GoUp from "../../components/Buttons/GoUp";
import ChatButton from "../../components/Buttons/ChatButton";
import { getPostBySlug } from "../../data/blogs/readPosts";

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

  const keyPoints = Array.isArray(post.keyPoints) ? post.keyPoints : [];
  const quickTips = Array.isArray(post.quickTips) ? post.quickTips : [];
  const hasTemplateContent =
    post.introHeading ||
    post.firstH2Heading ||
    post.secondH2Heading ||
    post.thirdH2Heading;

  return (
    <main className="bg-white">
      <TopTicker />
      <Navbar />

      {/* Hero with featured image */}
      <section className="relative w-full aspect-video max-h-[520px] bg-gray-200">
        <Image
          src={post.featuredImage || "/assets/images/hat/stitch/hat embroidery logo digitizing sewout (12).png"}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-10">
            <p className="text-white/90 text-sm mb-1">
              {post.category} • {post.date} • {post.readTime}
            </p>
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-lg">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Template Content */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {hasTemplateContent ? (
            <div className="space-y-10 px-2 md:px-4">
              {(post.introHeading || post.introText || post.introSideImage) && (
                <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-6 md:gap-8 items-start">
                  <div>
                    {post.introHeading && (
                      <h2 className="text-2xl md:text-3xl font-bold text-lv-blue mb-3 leading-tight">{post.introHeading}</h2>
                    )}
                    {post.introText && (
                      <p className="text-gray-700 whitespace-pre-wrap leading-7">{post.introText}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-3">
                      Published {post.date} • {post.readTime} • {post.category}
                    </p>
                  </div>
                  <div className="relative w-full aspect-4/3 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                    {post.introSideImage ? (
                      <Image src={post.introSideImage} alt={`${post.title} intro`} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">Right Side Intro Image</div>
                    )}
                  </div>
                </div>
              )}

              {(post.firstH2Heading || post.firstH2Text) && (
                <div>
                  {post.firstH2Heading && <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">{post.firstH2Heading}</h3>}
                  {post.firstH2Text && <p className="text-gray-700 whitespace-pre-wrap leading-7">{post.firstH2Text}</p>}
                </div>
              )}

              {(post.keyPointsTitle || keyPoints.length > 0) && (
                <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-5">
                  <h4 className="text-lg font-bold text-lv-blue mb-2">{post.keyPointsTitle || "Key Points"}</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {keyPoints.length > 0 ? (
                      keyPoints.map((point, idx) => <li key={idx}>✓ {point}</li>)
                    ) : (
                      <li>✓ Add your key points from the add-blog form.</li>
                    )}
                  </ul>
                </div>
              )}

              {(post.secondH2Heading || post.secondH2Text || post.secondSectionImage) && (
                <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-6 md:gap-8 items-start">
                  <div>
                    {post.secondH2Heading && <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">{post.secondH2Heading}</h3>}
                    {post.secondH2Text && <p className="text-gray-700 whitespace-pre-wrap leading-7">{post.secondH2Text}</p>}
                  </div>
                  <div className="relative w-full aspect-4/3 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                    {post.secondSectionImage ? (
                      <Image src={post.secondSectionImage} alt={`${post.title} section`} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">Right Side Content Image</div>
                    )}
                  </div>
                </div>
              )}

              {(post.thirdH2Heading || post.thirdH2Text) && (
                <div>
                  {post.thirdH2Heading && <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">{post.thirdH2Heading}</h3>}
                  {post.thirdH2Text && <p className="text-gray-700 whitespace-pre-wrap leading-7">{post.thirdH2Text}</p>}
                </div>
              )}

              {(post.quickTipsTitle || quickTips.length > 0) && (
                <div className="rounded-xl border border-amber-100 bg-amber-50 p-4 md:p-5">
                  <h4 className="text-lg font-bold text-amber-800 mb-2">{post.quickTipsTitle || "Quick Tip or Quick Points"}</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {quickTips.length > 0 ? (
                      quickTips.map((tip, idx) => <li key={idx}>✓ {tip}</li>)
                    ) : (
                      <li>✓ Add quick tips from the add-blog form.</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="prose prose-lg prose-gray max-w-none px-2 md:px-4">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">{post.content}</div>
            </div>
          )}

          <div className="mt-10 pt-6 border-t border-gray-200">
            <Link href="/blog" className="text-lv-red font-semibold hover:underline">
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
