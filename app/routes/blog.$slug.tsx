// app/routes/blog.$slug.tsx
import React from "react";
import { Link, useParams } from "react-router-dom";
import Header from "~/Components/Header";
import Footer from "~/Components/Footer";

// Sample blog data with slugs
const blogPosts = [
  {
    id: 1,
    slug: "green-onion-knife-and-salad-place",
    title: "Green Onion Knife and Salad Place: A Guide to Fresh Organic Cooking",
    excerpt: "Discover the art of preparing fresh organic salads with proper techniques and tools for maximum flavor and nutrition.",
    content: `
      <p class="text-xl text-gray-600 leading-relaxed mb-6">In the world of organic cooking, the right techniques and tools can transform simple ingredients into extraordinary meals. Today, we explore the art of salad preparation with a focus on green onions and proper knife skills.</p>
      
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">The Importance of Proper Knife Skills</h2>
      <p class="text-gray-700 leading-relaxed mb-4">Mastering knife skills is fundamental to efficient and enjoyable cooking. A sharp knife and proper technique not only make preparation faster but also help preserve the nutrients in your organic vegetables.</p>
      
      <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">Choosing the Right Knife</h3>
      <p class="text-gray-700 leading-relaxed mb-6">For delicate work with green onions and herbs, a chef's knife or paring knife works best. The key is keeping your knives sharp - a dull knife requires more pressure and can damage cell walls, leading to nutrient loss.</p>
      
      <div class="bg-red-50 border-l-4 border-[#b91d08] pl-6 py-4 my-6">
        <p class="text-gray-700 italic text-lg">"The way you cut your vegetables affects not just their appearance, but their flavor and texture in the final dish."</p>
      </div>
      
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Green Onion Preparation Techniques</h2>
      <p class="text-gray-700 leading-relaxed mb-4">Green onions, also known as scallions, are versatile ingredients that add mild onion flavor to salads, stir-fries, and garnishes. Here are our recommended preparation methods:</p>
      
      <ul class="space-y-2 mb-6">
        <li class="flex items-start">
          <span class="w-2 h-2 bg-[#b91d08] rounded-full mt-2 mr-3 flex-shrink-0"></span>
          <span class="text-gray-700"><strong class="text-gray-900">Thin Slices:</strong> Perfect for garnishes and salads</span>
        </li>
        <li class="flex items-start">
          <span class="w-2 h-2 bg-[#b91d08] rounded-full mt-2 mr-3 flex-shrink-0"></span>
          <span class="text-gray-700"><strong class="text-gray-900">Bias Cuts:</strong> Great for stir-fries and visual appeal</span>
        </li>
        <li class="flex items-start">
          <span class="w-2 h-2 bg-[#b91d08] rounded-full mt-2 mr-3 flex-shrink-0"></span>
          <span class="text-gray-700"><strong class="text-gray-900">Chopped:</strong> Ideal for salsas and dressings</span>
        </li>
      </ul>
      
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Building the Perfect Organic Salad</h2>
      <p class="text-gray-700 leading-relaxed">Combine your perfectly cut green onions with other fresh organic ingredients. Start with a base of mixed greens, add colorful vegetables, and finish with your homemade dressing.</p>
    `,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=500&fit=crop",
    category: "cooking",
    author: "Andrew Louise",
    date: "2021-01-03",
    readTime: "5 min read",
    commentCount: 6,
    tags: ["cooking", "organic", "knife skills", "salad", "nutrition"]
  },
  {
    id: 2,
    slug: "organic-mix-masala-fresh-soft",
    title: "Organic Mix Masala: Creating Fresh & Soft Spice Blends",
    excerpt: "Learn how to create your own organic spice blends that are fresh, aromatic, and free from artificial additives.",
    content: `
      <p class="text-xl text-gray-600 leading-relaxed mb-6">Creating your own organic spice blends allows you to control the quality and freshness of your ingredients while avoiding preservatives and artificial colors.</p>
      
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">The Benefits of Organic Spices</h2>
      <p class="text-gray-700 leading-relaxed mb-6">Organic spices are grown without synthetic pesticides and fertilizers, resulting in purer flavors and higher nutritional value. They also support sustainable farming practices.</p>
    `,
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=800&h=500&fit=crop",
    category: "recipes",
    author: "Andrew Louise",
    date: "2021-01-05",
    readTime: "4 min read",
    commentCount: 0,
    tags: ["spices", "masala", "organic", "cooking", "recipes"]
  },
  {
    id: 3,
    slug: "all-time-fresh-every-time",
    title: "All Time Fresh: Vegetable Storage Techniques That Work",
    excerpt: "Professional tips for keeping your organic vegetables fresh and nutritious for longer periods.",
    content: `
      <p class="text-xl text-gray-600 leading-relaxed mb-6">Proper storage is the key to maintaining the freshness, flavor, and nutritional value of your organic vegetables. Learn the techniques that professionals use.</p>
      
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Understanding Vegetable Respiration</h2>
      <p class="text-gray-700 leading-relaxed mb-6">Vegetables continue to breathe after harvest, and different types require different storage conditions to slow this process and extend freshness.</p>
    `,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&h=500&fit=crop",
    category: "storage",
    author: "Andrew Louise",
    date: "2021-01-07",
    readTime: "3 min read",
    commentCount: 0,
    tags: ["storage", "fresh", "vegetables", "preservation", "tips"]
  },
  {
    id: 4,
    slug: "health-and-skin-for-your-organic",
    title: "Health and Skin Benefits of Organic Foods",
    excerpt: "Discover how incorporating organic foods into your diet can improve your skin health and overall wellbeing.",
    content: `
      <p class="text-xl text-gray-600 leading-relaxed mb-6">The connection between diet and skin health is undeniable, and organic foods offer unique benefits for achieving radiant, healthy skin from the inside out.</p>
      
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Nutrients for Skin Health</h2>
      <p class="text-gray-700 leading-relaxed mb-6">Organic vegetables are rich in antioxidants, vitamins, and minerals that combat oxidative stress and support collagen production for youthful-looking skin.</p>
    `,
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=500&fit=crop",
    category: "health",
    author: "Andrew Louise",
    date: "2021-01-15",
    readTime: "7 min read",
    commentCount: 0,
    tags: ["health", "skin", "organic", "nutrition", "wellness"]
  },
  {
    id: 5,
    slug: "natural-farming-techniques",
    title: "Natural Farming Techniques for Better Yield",
    excerpt: "Explore sustainable farming methods that increase productivity while protecting the environment.",
    content: `
      <p class="text-xl text-gray-600 leading-relaxed mb-6">Sustainable farming practices not only protect our environment but also produce healthier, more nutritious crops.</p>
    `,
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=500&fit=crop",
    category: "news",
    author: "Andrew Louise",
    date: "2021-01-18",
    readTime: "6 min read",
    commentCount: 3,
    tags: ["farming", "sustainable", "techniques", "organic"]
  },
  {
    id: 6,
    slug: "seasonal-vegetable-guide",
    title: "Seasonal Vegetable Guide: What to Eat When",
    excerpt: "A comprehensive guide to seasonal vegetables and their nutritional benefits throughout the year.",
    content: `
      <p class="text-xl text-gray-600 leading-relaxed mb-6">Eating seasonally ensures you get the freshest, most nutritious vegetables while supporting local farmers.</p>
    `,
    image: "https://images.unsplash.com/photo-1574856344991-aaa31b6f4ce3?w=800&h=500&fit=crop",
    category: "storage",
    author: "Andrew Louise",
    date: "2021-01-20",
    readTime: "5 min read",
    commentCount: 2,
    tags: ["seasonal", "vegetables", "guide", "nutrition"]
  }
];

export default function BlogDetailPage() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug) || blogPosts[0];

  // Get recent posts for sidebar (excluding current post)
  const recentPosts = blogPosts
    .filter(p => p.slug !== post.slug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Blog Header */}
      <section className="bg-gradient-to-b from-gray-50 to-white text-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="inline-block bg-[#b91d08] text-white text-sm px-4 py-2 rounded-full capitalize font-bold border border-[#9e1807]">
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight text-gray-900">
              {post.title}
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#b91d08] to-[#9e1807] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  AL
                </div>
                <div>
                  <span className="font-bold text-gray-900">By {post.author}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1 font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(post.date)}
                </span>
                <span className="text-gray-400">•</span>
                <span className="flex items-center gap-1 font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {post.readTime}
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  {post.commentCount} comments
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              
              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* Featured Image */}
                <div className="mb-12 rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-64 lg:h-96 object-cover"
                  />
                </div>

                {/* Blog Content */}
                <article className="max-w-none mb-12">
                  <div 
                    dangerouslySetInnerHTML={{ __html: post.content }}
                    className="text-gray-700 leading-relaxed"
                  />
                </article>

                {/* Tags */}
                <div className="flex flex-wrap gap-3 mb-12">
                  {post.tags.map((tag, index) => (
                    <Link
                      key={index}
                      to={`/blog?tag=${tag}`}
                      className="bg-gray-100 hover:bg-[#b91d08] text-gray-700 hover:text-white px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer border border-gray-200 hover:border-transparent shadow-sm"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>

                {/* Share Buttons */}
                <div className="border-t border-b border-gray-200 py-6 mb-12">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Share this article</h3>
                  <div className="flex gap-3">
                    <button className="w-12 h-12 bg-[#b91d08] text-white rounded-full flex items-center justify-center hover:bg-[#9e1807] transition-colors shadow-md">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </button>
                    <button className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-md">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                      </svg>
                    </button>
                    <button className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors shadow-md">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 py-6 border-t border-gray-200">
                  <Link
                    to="/blog"
                    className="px-6 py-3 border-2 border-[#b91d08] text-[#b91d08] rounded-full hover:bg-[#b91d08] hover:text-white transition-all duration-300 font-bold text-lg flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Blog
                  </Link>
                  <button className="px-6 py-3 bg-[#b91d08] hover:bg-[#9e1807] text-white rounded-full hover:shadow-lg transition-all duration-300 font-bold text-lg flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    Next Article
                  </button>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                
                {/* Recent Posts */}
                <div className="sticky top-8 space-y-8">
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">Recent Articles</h3>
                    <div className="space-y-5">
                      {recentPosts.map(recentPost => (
                        <Link 
                          key={recentPost.slug}
                          to={`/blog/${recentPost.slug}`}
                          className="flex items-start gap-4 group hover:transform hover:-translate-y-1 transition-all duration-300"
                        >
                          <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 shadow-sm border border-gray-200">
                            <img 
                              src={recentPost.image} 
                              alt={recentPost.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 text-sm group-hover:text-[#b91d08] transition-colors line-clamp-2 leading-tight mb-1">
                              {recentPost.title}
                            </h4>
                            <p className="text-gray-500 text-xs font-medium">{formatDate(recentPost.date)}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Newsletter */}
                  <div className="bg-gradient-to-br from-[#b91d08] to-[#9e1807] text-white rounded-2xl shadow-lg p-6">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
                      <p className="text-white/90 text-sm mb-4">
                        Get the latest organic recipes and health tips
                      </p>
                    </div>
                    <div className="space-y-3">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:ring-2 focus:ring-white focus:outline-none text-sm font-medium"
                      />
                      <button className="w-full bg-white text-[#b91d08] font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
                        Subscribe
                      </button>
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">Categories</h3>
                    <div className="space-y-3">
                      {['cooking', 'recipes', 'health', 'news', 'storage'].map(category => (
                        <Link
                          key={category}
                          to={`/blog?category=${category}`}
                          className="flex items-center justify-between text-gray-700 hover:text-[#b91d08] transition-colors group"
                        >
                          <span className="font-medium capitalize">{category}</span>
                          <span className="text-gray-500 text-sm font-bold group-hover:text-[#b91d08]">
                            {blogPosts.filter(p => p.category === category).length}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}