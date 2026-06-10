import { useState } from 'react';
import { useStore } from '../store';
import { Star, Check, ArrowDown, MoveRight, ChevronLeft, ChevronRight } from 'lucide-react';

export function Landing() {
  const product = useStore(state => state.products[0]);
  const addToCart = useStore(state => state.addToCart);
  
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) return null;

  return (
    <div className="bg-brand-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden w-full pt-12 pb-24 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-24">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-300 rounded-full filter blur-[100px] opacity-60 -z-10 mt-20"></div>
        <div className="flex-1 text-center md:text-left z-10 w-full">
          <h1 className="font-serif text-[4rem] sm:text-6xl md:text-7xl lg:text-[6rem] font-black leading-none uppercase mb-6 text-brand-900 tracking-[-0.02em]">
            Walk on <br/>
            <span className="text-brand-500 italic">Clouds.</span>
          </h1>
          <p dir="rtl" className="text-lg text-brand-600 mb-12 max-w-md mx-auto md:mx-0 leading-relaxed font-light">
            راحة مطلقة بلا قيود، وفخامة صيفية هبال. الكلاكات متاعنا مصممة باش تاخذ فورمة ساقك بالظبط، وتجمع بين الخفة والـ Minimalist Elegance لي تواتيك.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <a 
              href="#shop" 
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-brand-900 transition-colors hover:bg-brand-800 rounded-lg shadow-sm"
            >
              اطلبي الآن
            </a>
            <a 
              href="#benefits" 
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-medium text-brand-900 bg-transparent transition-colors hover:bg-brand-100 rounded-lg"
            >
              اكتشفي المزيد <ArrowDown className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
        
        <div className="flex-1 relative w-full h-full max-w-lg mx-auto md:h-auto">
          <div className="relative rounded overflow-hidden aspect-[4/5] bg-brand-100 shadow-sm border border-brand-200/50">
            <img 
              src={product.images[0]} 
              alt="Bossed Hearts Slide featured" 
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* Featured Product Section */}
      <section id="shop" className="bg-white py-24 border-t border-brand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
            {/* Image Gallery */}
            <div className="flex flex-col-reverse">
              <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                <div className="grid grid-cols-5 gap-2">
                  {product.images.map((image, i) => (
                    <button
                      key={i}
                      className={`relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4 overflow-hidden border-2 ${activeImage === i ? 'border-brand-500' : 'border-transparent'}`}
                      onClick={() => setActiveImage(i)}
                    >
                      <span className="sr-only">View image {i + 1}</span>
                      <span className="absolute inset-0 overflow-hidden rounded-md">
                        <img src={image} alt="" className="w-full h-full object-center object-cover" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-brand-100 group">
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-center object-cover"
                />
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImage((prev) => (prev > 0 ? prev - 1 : product.images.length - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full text-brand-900 shadow-md hover:bg-white transition-opacity sm:opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={() => setActiveImage((prev) => (prev < product.images.length - 1 ? prev + 1 : 0))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full text-brand-900 shadow-md hover:bg-white transition-opacity sm:opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="mt-10 px-4 sm:px-0 lg:mt-0 flex flex-col justify-center lg:pl-12 lg:border-l lg:border-brand-200">
              <div dir="rtl" className="mb-8">
                <span className="text-brand-500 text-xs font-bold block mb-2">متوفر الآن في المخزون</span>
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <h2 className="text-3xl font-serif text-brand-900 leading-tight">{product.name}</h2>
                  <div className="text-xl font-bold bg-brand-100 px-4 py-2 rounded text-brand-900">
                    {product.price.toFixed(0)} د.ت <span className="text-sm font-light">(العرض يشمل 2 قطع!)</span>
                  </div>
                </div>
              </div>

              <div dir="rtl" className="mt-2 mb-8">
                <h3 className="sr-only">Description</h3>
                <div className="text-base text-brand-600 space-y-6">
                  <p className="leading-relaxed font-light">{product.description}</p>
                </div>
              </div>

              <div className="mb-8 border-t border-brand-200 pt-8">
                <div dir="rtl" className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-brand-900">اكتشفي قياسك (EU)</h3>
                  <a href="#" className="text-xs font-bold text-brand-400 hover:text-brand-900 underline transition-colors">دليل المقاسات</a>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`
                        border py-3 flex items-center justify-center text-xs font-bold uppercase transition-colors
                        ${selectedSize === size 
                          ? 'border-2 border-brand-900 bg-brand-900 text-white' 
                          : 'bg-white border-brand-200 text-brand-900 hover:border-brand-900'}
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {!selectedSize && (
                  <p dir="rtl" className="mt-4 text-sm text-brand-500 font-bold">الرجاء اختيار المقاس لتأكيد الطلب.</p>
                )}
              </div>

              <div dir="rtl" className="bg-brand-100 p-6 rounded mb-8 border border-brand-200">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white rounded shadow-sm flex-shrink-0">
                    <Check className="w-5 h-5 text-brand-500" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-brand-900">الدفع عند الاستلام متوفر وآمن 100%</p>
                    <p className="text-xs text-brand-600 mt-1 font-light tracking-wide">ما تخلص كان ما توصلك أمانتك لباب الدار. فخامة وراحة من غير حتى ريسك.</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex w-full">
                <button
                  type="button"
                  disabled={!selectedSize}
                  onClick={() => selectedSize && addToCart(product, selectedSize, 1)}
                  className={`w-full bg-brand-900 text-white py-6 font-bold uppercase transition-colors ${!selectedSize ? 'bg-brand-900/50 cursor-not-allowed' : 'hover:bg-brand-800'}`}
                >
                  أضف للحقيبة — 2 قطع بـ {product.price.toFixed(0)} د.ت فقط
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits / Features */}
      <section id="benefits" className="py-24 bg-brand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div dir="rtl" className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-900 mb-4">علاش مستحيل عاد تنحيها من ساقك؟</h2>
            <p className="text-lg text-brand-600">ركزنا في كل تفصيلة صغيرة باش إنتي ما تخمم في شيء. كل انحناء وكل مادة تخدمت خصيصاً لراحتك اليومية.</p>
          </div>

          <div dir="rtl" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {product.features.map((feature, idx) => (
              <div key={idx} className="bg-brand-50 p-8 shadow-sm border border-brand-200 hover:shadow transition-shadow">
                <div className="w-12 h-12 bg-white border border-brand-200 rounded-none flex items-center justify-center mb-6 text-brand-900 shadow-sm mr-auto ml-0">
                  <Check size={20} className="text-brand-500" />
                </div>
                <h3 className="text-sm font-bold tracking-widest text-brand-900 mb-3">{feature.title}</h3>
                <p className="text-brand-600 text-sm font-light leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-24 bg-brand-50 border-t border-brand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div dir="rtl" className="text-center mb-16">
            <h2 className="text-3xl font-serif text-brand-900 mb-4">محبوبة من آلاف النساء.</h2>
            <p className="text-brand-600 text-lg font-light">تجارب حقيقية من نساء جربوا فرق الراحة مع Bossed Hearts.</p>
          </div>
          <div dir="rtl" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "والله بكل صراحة أعز كلاكات لبستها في حياتي! تعطي وهرة وأناقة مش عادية مع اللبسة الخفيفة، ونحتلي وجيعة الساقين والظهر بعد نهار كامل وقوف وقضية الدار.",
                author: "مريم. ب",
                role: "كليان مؤكد"
              },
              {
                quote: "أخيراً لقيت كلاكات تجمع بين الزين والراحة. خفيفة ريشة، وجودة المادة تظهر من أول لمسة. ننصح بيها برشة!",
                author: "إيناس. ش",
                role: "كليان مؤكد"
              },
              {
                quote: "أول ما خذيتها خذيتها على خاطر الصيف والتحواس، ومن وقتها ما عادش نحيتها من ساقي. إحساس السحاب حقيقي مش كذب، وتواتي كل لبسة صيفية خفيفة.",
                author: "سوار. غ",
                role: "كليان مؤكد"
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white p-8 border border-brand-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex text-brand-500 mb-6 gap-1">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" strokeWidth={1} />)}
                  </div>
                  <p className="text-brand-600 font-light leading-relaxed mb-8">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div className="border-t border-brand-100 pt-6 mt-auto text-right">
                  <p className="text-sm font-bold tracking-widest text-brand-900 block mb-1">{testimonial.author}</p>
                  <p className="text-xs text-brand-400 tracking-widest font-light">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
