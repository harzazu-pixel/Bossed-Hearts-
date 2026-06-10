import { useState } from 'react';
import { useStore } from '../store';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, ChevronLeft, CreditCard } from 'lucide-react';

export function Checkout() {
  const { cart, placeOrder, clearCart } = useStore();
  const navigate = useNavigate();
  const [successOrderId, setSuccessOrderId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = total >= 100 ? 0 : 7;
  const grandTotal = total + shipping;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    const payload = {
      "الإسم الأول": formData.get('firstName') || "",
      "اللقب": formData.get('lastName') || "",
      "رقم الهاتف": `'${formData.get('phone') || ""}'`,
      "عنوان التوصيل": formData.get('address') || "",
      "المدينة / الولاية": formData.get('city') || "",
      "تأكيد المقاس": formData.get('confirmSize') || ""
    };

    try {
      await fetch('https://script.google.com/macros/s/AKfycbwJkdsGxj4YrdvK6oEpx0MQY11GWHGK5LG_ExAoCv3aNlqzWLd15DJKa1VBfZxW2bfDag/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      alert('فشل الاتصال. يرجى المحاولة لاحقاً.');
      console.error('Error submitting form:', error);
    }
    
    const orderData = {
      customerName: formData.get('firstName') + ' ' + formData.get('lastName'),
      address: formData.get('address') as string,
      city: formData.get('city') as string,
      phone: formData.get('phone') as string,
    };

    const newOrder = placeOrder(orderData);
    setSuccessOrderId(newOrder.id);
    setIsSubmitting(false);
  };

  if (successOrderId) {
    return (
      <div className="min-h-[80vh] bg-brand-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 md:p-12 rounded border border-brand-200 shadow-sm max-w-lg w-full text-center">
          <div className="mx-auto w-16 h-16 bg-brand-100 text-brand-500 rounded-full flex items-center justify-center mb-8">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-3xl font-serif text-brand-900 mb-4">تم تأكيد الطلب</h2>
          <p className="text-brand-600 mb-8 leading-relaxed font-light text-sm">
            شكراً لتسوقك من Bossed Hearts. طلبك قيد التجهيز وسيتم الدفع نقداً عند الاستلام.
          </p>
          <div className="bg-brand-50 p-6 rounded mb-8 border border-brand-200">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-400 mb-2">رقم الطلب</p>
            <p className="text-lg font-mono text-brand-900 tracking-widest">{successOrderId}</p>
          </div>
          <Link to="/" className="inline-flex w-full justify-center rounded-none bg-brand-900 px-6 py-4 text-white text-sm font-bold tracking-[0.2em] uppercase hover:bg-brand-800 transition-colors">
            العودة للمتجر
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-serif text-brand-900 mb-4">Your bag is empty</h2>
        <button onClick={() => navigate('/')} className="text-brand-500 hover:text-brand-900 underline underline-offset-4">Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="bg-brand-50 min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 pt-8 sm:px-6 lg:px-8">
        <button onClick={() => navigate(-1)} className="flex items-center text-sm font-medium text-brand-500 hover:text-brand-900 transition-colors mb-8" dir="rtl">
          <ChevronLeft size={16} className="ml-1 rotate-180" /> رجوع
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Form */}
          <div dir="rtl">
            <h2 className="text-3xl font-serif font-bold text-brand-900 mb-8">معلومات الشحن</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-xs font-bold uppercase tracking-widest text-brand-900 mb-2">الإسم الأول</label>
                  <input required type="text" id="firstName" name="firstName" className="block w-full rounded-none border border-brand-200 shadow-sm focus:border-brand-900 focus:ring-0 p-3 bg-white transition-colors" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs font-bold uppercase tracking-widest text-brand-900 mb-2">اللقب</label>
                  <input required type="text" id="lastName" name="lastName" className="block w-full rounded-none border border-brand-200 shadow-sm focus:border-brand-900 focus:ring-0 p-3 bg-white transition-colors" />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-widest text-brand-900 mb-2">رقم الهاتف</label>
                <input required type="tel" id="phone" name="phone" className="block w-full rounded-none border border-brand-200 shadow-sm focus:border-brand-900 focus:ring-0 p-3 bg-white transition-colors text-right" dir="ltr" placeholder="+216" />
              </div>

              <div>
                <label htmlFor="address" className="block text-xs font-bold uppercase tracking-widest text-brand-900 mb-2">عنوان التوصيل</label>
                <input required type="text" id="address" name="address" className="block w-full rounded-none border border-brand-200 shadow-sm focus:border-brand-900 focus:ring-0 p-3 bg-white transition-colors" />
              </div>

              <div>
                <label htmlFor="city" className="block text-xs font-bold uppercase tracking-widest text-brand-900 mb-2">المدينة / الولاية</label>
                <input required type="text" id="city" name="city" className="block w-full rounded-none border border-brand-200 shadow-sm focus:border-brand-900 focus:ring-0 p-3 bg-white transition-colors" />
              </div>

              <div>
                <label htmlFor="confirmSize" className="block text-xs font-bold uppercase tracking-widest text-brand-900 mb-2">تأكيد المقاس</label>
                <input required type="text" id="confirmSize" name="confirmSize" className="block w-full rounded-none border border-brand-200 shadow-sm focus:border-brand-900 focus:ring-0 p-3 bg-white transition-colors" placeholder="مثال: 38" />
              </div>

              <div className="mt-10 pt-10 border-t border-brand-200">
                <h3 className="text-xl font-serif font-medium text-brand-900 mb-6">خيارات الدفع</h3>
                
                <div className="relative flex items-center p-5 border-2 border-brand-500 bg-brand-50 rounded-lg cursor-pointer">
                  <div className="flex items-center h-5">
                    <input id="cod" name="paymentMethod" type="radio" defaultChecked className="focus:ring-brand-500 h-4 w-4 text-brand-600 border-gray-300" />
                  </div>
                  <div className="mr-4 flex flex-1 items-center justify-between">
                    <div className="flex flex-col">
                      <label htmlFor="cod" className="block text-sm font-medium text-brand-900 cursor-pointer">
                        الدفع عند الاستلام (COD)
                      </label>
                      <span className="block text-sm text-brand-500 mt-1">خلص كاش لباب الدار أول ما توصلك أمانتك.</span>
                    </div>
                    <CreditCard className="text-brand-400" />
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center rounded-none bg-brand-900 px-4 py-5 font-bold uppercase tracking-[0.2em] text-sm text-white shadow-sm hover:bg-brand-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'جاري التحميل...' : `تأكيد الطلب — ${grandTotal.toFixed(0)} د.ت`}
                </button>
                <p className="text-xs text-center text-brand-400 mt-4 font-bold">بتأكيدك للطلب، إنتي توافق على شروط الخدمة متاعنا.</p>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="mt-10 lg:mt-0" dir="rtl">
            <h2 className="text-3xl font-serif font-bold text-brand-900 mb-8 hidden lg:block">ملخص الطلب</h2>
            <div className="bg-white rounded shadow-sm border border-brand-100 p-6 sm:p-8 sticky top-32">
              <ul className="space-y-6 divide-y divide-brand-100">
                {cart.map((item) => (
                  <li key={item.cartItemId} className="flex pt-6 first:pt-0">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded bg-brand-100">
                      <img src={item.product.images[0]} alt={item.product.name} className="h-full w-full object-cover object-center" />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col justify-center">
                      <div dir="rtl" className="flex justify-between text-base font-bold text-brand-900 uppercase tracking-widest">
                        <h3 className="text-xs">{item.product.name}</h3>
                        <p className="mr-4 text-xs">{(item.product.price * item.quantity).toFixed(0)} د.ت</p>
                      </div>
                      <p dir="rtl" className="mt-2 text-xs text-brand-600 font-light">المقاس {item.size} <span className="mx-2">&middot;</span> الكمية: {item.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <dl dir="rtl" className="mt-10 space-y-4 border-t border-brand-200 pt-6 text-xs uppercase tracking-widest font-bold text-brand-900">
                <div className="flex items-center justify-between">
                  <dt>المجموع الفرعي</dt>
                  <dd className="text-brand-900">{total.toFixed(0)} د.ت</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>التوصيل</dt>
                  <dd className="text-brand-900">{shipping === 0 ? 'مجاني' : `${shipping} د.ت`}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-brand-200 pt-4">
                  <dt className="text-base text-brand-900">الإجمالي</dt>
                  <dd className="text-xl font-serif text-brand-900">{grandTotal.toFixed(0)} د.ت</dd>
                </div>
              </dl>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
