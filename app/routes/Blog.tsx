// app/routes/blog.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "~/Components/Header";
import Footer from "~/Components/Footer";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "all", name: "All Articles", count: 12 },
    { id: "recipes", name: "Recipes", count: 5 },
    { id: "health", name: "Health & Nutrition", count: 4 },
    { id: "cooking", name: "Cooking Tips", count: 3 },
    { id: "storage", name: "Storage Guide", count: 2 },
    { id: "news", name: "Company News", count: 3 }
  ];

  const blogPosts = [
    {
      id: 1,
      slug: "green-onion-knife-and-salad-place",
      title: "Green onion knife and salad place",
      excerpt: "What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=250&fit=crop",
      category: "health",
      author: "Andrew Louise",
      date: "2021-01-03",
      readTime: "5 min read",
      commentCount: 6,
      tags: ["health", "organic", "skin"]
    },
    {
      id: 2,
      slug: "organic-mix-masala-fresh-soft",
      title: "Organic mix masala fresh & soft",
      excerpt: "What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=250&fit=crop",
      category: "recipes",
      author: "Andrew Louise",
      date: "2021-01-05",
      readTime: "4 min read",
      commentCount: 0,
      tags: ["organic", "masala", "fresh"]
    },
    {
      id: 3,
      slug: "all-time-fresh-every-time",
      title: "All time fresh every time available",
      excerpt: "What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=250&fit=crop",
      category: "storage",
      author: "Andrew Louise",
      date: "2021-01-07",
      readTime: "3 min read",
      commentCount: 0,
      tags: ["fresh", "storage", "tips"]
    },
    {
      id: 4,
      slug: "vegist-special-liquide-fresh-veget",
      title: "Vegist special liquide fresh veget",
      excerpt: "What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=250&fit=crop",
      category: "health",
      author: "Andrew Louise",
      date: "2021-01-10",
      readTime: "6 min read",
      commentCount: 0,
      tags: ["vegetables", "liquid", "fresh"]
    },
    {
      id: 5,
      slug: "fresh-organics-brand-and-picnic",
      title: "Fresh organics brand and picnic",
      excerpt: "What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=250&fit=crop",
      category: "news",
      author: "Andrew Louise",
      date: "2021-01-12",
      readTime: "4 min read",
      commentCount: 0,
      tags: ["organic", "brand", "picnic"]
    },
    {
      id: 6,
      slug: "health-and-skin-for-your-organic",
      title: "Health and skin for your organic",
      excerpt: "What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=250&fit=crop",
      category: "health",
      author: "Andrew Louise",
      date: "2021-01-15",
      readTime: "7 min read",
      commentCount: 0,
      tags: ["health", "skin", "organic"]
    },
    {
      id: 7,
      slug: "natural-farming-techniques",
      title: "Natural farming techniques",
      excerpt: "What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=250&fit=crop",
      category: "news",
      author: "Andrew Louise",
      date: "2021-01-18",
      readTime: "8 min read",
      commentCount: 3,
      tags: ["farming", "natural", "techniques"]
    },
    {
      id: 8,
      slug: "seasonal-vegetable-guide",
      title: "Seasonal vegetable guide",
      excerpt: "What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: "https://images.unsplash.com/photo-1574856344991-aaa31b6f4ce3?w=400&h=250&fit=crop",
      category: "storage",
      author: "Andrew Louise",
      date: "2021-01-20",
      readTime: "5 min read",
      commentCount: 2,
      tags: ["seasonal", "vegetables", "guide"]
    },
    {
      id: 9,
      slug: "organic-cooking-essentials",
      title: "Organic cooking essentials",
      excerpt: "What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=250&fit=crop",
      category: "cooking",
      author: "Andrew Louise",
      date: "2021-01-22",
      readTime: "6 min read",
      commentCount: 4,
      tags: ["cooking", "essentials", "organic"]
    }
  ];

  const archiveMonths = [
    { month: "February 2021", count: 6 },
    { month: "January 2021", count: 9 },
    { month: "December 2020", count: 4 },
    { month: "November 2020", count: 3 }
  ];

  const recentPosts = [
    { slug: "organics-mix-masala-fresh", title: "Organics mix masala fresh...", date: "2021-02-03" },
    { slug: "all-time-fresh-every-time", title: "All time fresh every time...", date: "2021-02-03" },
    { slug: "health-and-skin-for-your-organic", title: "Health and skin for your...", date: "2021-02-03" },
    { slug: "green-onion-knife-and-salad-place", title: "Green onion knife and...", date: "2021-02-01" },
    { slug: "vegist-special-liquide-fresh-veget", title: "Vegist special liquide...", date: "2021-01-28" }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Header */}
      <section className="bg-[#fcf6ed] text-[#cf5923] py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Vegist Blog</h1>
          <p className="text-xl lg:text-2xl font-semibold text-[#cf5923] max-w-3xl mx-auto">
            Discover recipes, cooking tips, health insights & Vegist news
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">

              {/* Search */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Search Blog</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-[#cf5923] focus:outline-none"
                  />
                  <svg
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
              </div>

              {/* Recent Posts */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Posts</h3>
                <div className="space-y-4">
                  {recentPosts.map(post => (
                    <div key={post.slug} className="pb-4 border-b border-gray-100 last:border-0">
                      <Link to={`/blog/${post.slug}`} className="text-gray-700 hover:text-[#cf5923] transition-colors text-sm font-medium">
                        {post.title}
                      </Link>
                      <p className="text-gray-500 text-xs mt-1">{formatDate(post.date)}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Blog List */}
            <div className="lg:col-span-3">

              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedCategory === "all"
                    ? "All Articles"
                    : categories.find(c => c.id === selectedCategory)?.name}
                </h2>

                <span className="text-white bg-[#cf5923] px-3 py-1 rounded-full text-sm">
                  {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
                </span>
              </div>

              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredPosts.map(post => (
                    <article
                      key={post.id}
                      className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition"
                    >
                      <Link to={`/blog/${post.slug}`} className="block">
                        
                        <div className="h-48 bg-gray-100 overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        <div className="p-5">

                          <span className="inline-block bg-[#fcf6ed] text-[#cf5923] text-xs px-2 py-1 rounded-full capitalize mb-3">
                            {post.category}
                          </span>

                          <h3 className="text-lg font-bold text-gray-800 mb-3 hover:text-[#cf5923] transition">
                            {post.title}
                          </h3>

                          <div className="flex items-center text-sm text-gray-600 mb-3">
                            <span>By {post.author}</span>
                          </div>

                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>

                          <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                            <Link to={`/blog/${post.slug}`} className="text-[#cf5923] hover:opacity-80 text-sm font-medium flex items-center group">
                              Read more
                              <svg
                                className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                              </svg>
                            </Link>

                            <div className="flex items-center space-x-3 text-xs text-gray-500">
                              <span>{formatDate(post.date)}</span>
                              <span className="flex items-center">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                                </svg>
                                {post.commentCount}
                              </span>
                            </div>

                          </div>

                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="text-6xl mb-4 text-[#cf5923]">📝</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No articles found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>

                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setSearchTerm("");
                    }}
                    className="bg-[#cf5923] hover:bg-[#b84f1f] text-white font-medium py-2 px-6 rounded-lg transition"
                  >
                    Reset Filters
                  </button>
                </div>
              )}

              {filteredPosts.length >= 9 && (
                <div className="text-center mt-12">
                  <button className="bg-[#cf5923] hover:bg-[#b84f1f] text-white font-medium py-3 px-8 rounded-lg transition shadow-sm">
                    Load More Articles
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
