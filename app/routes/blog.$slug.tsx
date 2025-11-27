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
      
      <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">The Importance of Proper Knife Skills</h2>
      <p class="text-gray-700 leading-relaxed mb-4">Mastering knife skills is fundamental to efficient and enjoyable cooking. A sharp knife and proper technique not only make preparation faster but also help preserve the nutrients in your organic vegetables.</p>
      
      <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Choosing the Right Knife</h3>
      <p class="text-gray-700 leading-relaxed mb-6">For delicate work with green onions and herbs, a chef's knife or paring knife works best. The key is keeping your knives sharp - a dull knife requires more pressure and can damage cell walls, leading to nutrient loss.</p>
      
      <div class="bg-gray-50 border-l-4 border-[#6B8E23] pl-6 py-4 my-6">
        <p class="text-gray-700 italic text-lg">"The way you cut your vegetables affects not just their appearance, but their flavor and texture in the final dish."</p>
      </div>
      
      <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">Green Onion Preparation Techniques</h2>
      <p class="text-gray-700 leading-relaxed mb-4">Green onions, also known as scallions, are versatile ingredients that add mild onion flavor to salads, stir-fries, and garnishes. Here are our recommended preparation methods:</p>
      
      <ul class="space-y-2 mb-6">
        <li class="flex items-start">
          <span class="w-2 h-2 bg-[#6B8E23] rounded-full mt-2 mr-3 flex-shrink-0"></span>
          <span class="text-gray-700"><strong class="text-gray-800">Thin Slices:</strong> Perfect for garnishes and salads</span>
        </li>
        <li class="flex items-start">
          <span class="w-2 h-2 bg-[#6B8E23] rounded-full mt-2 mr-3 flex-shrink-0"></span>
          <span class="text-gray-700"><strong class="text-gray-800">Bias Cuts:</strong> Great for stir-fries and visual appeal</span>
        </li>
        <li class="flex items-start">
          <span class="w-2 h-2 bg-[#6B8E23] rounded-full mt-2 mr-3 flex-shrink-0"></span>
          <span class="text-gray-700"><strong class="text-gray-800">Chopped:</strong> Ideal for salsas and dressings</span>
        </li>
      </ul>
      
      <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">Building the Perfect Organic Salad</h2>
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
      
      <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">The Benefits of Organic Spices</h2>
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
      
      <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">Understanding Vegetable Respiration</h2>
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
      
      <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">Nutrients for Skin Health</h2>
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
      <section className="bg-[#F5F5DC] text-[#6B8E23] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="inline-block bg-white/10 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full capitalize font-medium border border-white/20">
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-[#6B8E23]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#6B8E23] to-[#5A7A1A] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  AL
                </div>
                <div>
                  <span className="font-medium text-[#6B8E23]">By {post.author}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(post.date)}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {post.readTime}
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
                <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
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
                    <span 
                      key={index}
                      className="bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:from-[#6B8E23] hover:to-[#5A7A1A] hover:text-white transition-all duration-300 cursor-pointer border border-gray-200 hover:border-transparent shadow-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Author Bio */}
              
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                
                {/* Recent Posts */}
                <div className="sticky top-8 space-y-8">
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">Recent Articles</h3>
                    <div className="space-y-5">
                      {recentPosts.map(recentPost => (
                        <Link 
                          key={recentPost.slug}
                          to={`/blog/${recentPost.slug}`}
                          className="flex items-start gap-4 group hover:transform hover:-translate-y-1 transition-all duration-300"
                        >
                          <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                            <img 
                              src={recentPost.image} 
                              alt={recentPost.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-800 text-sm group-hover:text-[#6B8E23] transition-colors line-clamp-2 leading-tight mb-1">
                              {recentPost.title}
                            </h4>
                            <p className="text-gray-500 text-xs">{formatDate(recentPost.date)}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Newsletter */}
                  <div className="bg-gradient-to-br from-[#6B8E23] to-[#5A7A1A] text-white rounded-2xl shadow-lg p-6">
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
                        className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:ring-2 focus:ring-white focus:outline-none text-sm"
                      />
                      <button className="w-full bg-white text-[#6B8E23] font-semibold py-3 rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
                        Subscribe
                      </button>
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