import { Menu, ShoppingBag, X } from 'lucide-react';
import { useStore } from '../store';
import { Link, useNavigate } from 'react-router-dom';

export function CartDrawer() {
  const { cart, isCartOpen, setCartOpen, removeFromCart } = useStore();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal >= 100 ? 0 : 7;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    setCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-brand-900/30 backdrop-blur-sm transition-opacity"
        onClick={() => setCartOpen(false)}
      />
      
      <div className="fixed inset-y-0 right-0 flex max-w-full sm:pl-10">
        <div className="w-screen max-w-md transform transition-transform duration-500 ease-in-out shadow-2xl">
          <div className="flex h-full flex-col bg-brand-50 shadow-xl">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-brand-200" dir="rtl">
              <h2 className="text-xl font-serif font-medium text-brand-900">حقيبة التسوق</h2>
              <button
                type="button"
                className="-m-2 p-2 text-brand-400 hover:text-brand-900 transition-colors"
                onClick={() => setCartOpen(false)}
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div dir="rtl" className="flex-1 overflow-y-auto px-6 py-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <ShoppingBag size={48} className="text-brand-300" />
                  <p className="text-brand-600 font-medium">الحقيبة فارغة حاليا.</p>
                  <button 
                    onClick={() => setCartOpen(false)}
                    className="mt-4 text-brand-500 hover:text-brand-900 underline font-medium underline-offset-4 transition-colors"
                  >
                    مواصلة التسوق
                  </button>
                </div>
              ) : (
                <ul className="space-y-8">
                  {cart.map((item) => (
                    <li key={item.cartItemId} className="flex">
                      <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded bg-brand-100">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="mr-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-bold text-brand-900 tracking-wider">
                            <h3 className="text-sm font-bold">
                              {item.product.name}
                            </h3>
                            <p className="mr-4 text-sm font-bold text-brand-900">{(item.product.price * item.quantity).toFixed(0)} د.ت</p>
                          </div>
                          <p className="mt-1 text-sm text-brand-500">المقاس {item.size}</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-sm text-brand-600 font-bold">الكمية: {item.quantity}</p>

                          <div className="flex">
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.cartItemId)}
                              className="text-sm font-bold text-brand-500 hover:text-brand-900 transition-colors underline decoration-brand-300 hover:decoration-brand-900 underline-offset-4"
                            >
                              حذف
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div dir="rtl" className="border-t border-brand-200 px-6 py-8 sm:px-6 bg-brand-100/50">
                <div className="flex justify-between text-sm text-brand-600 mb-2">
                  <p>المجموع الفرعي</p>
                  <p className="font-bold">{subtotal.toFixed(0)} د.ت</p>
                </div>
                <div className="flex justify-between text-sm text-brand-600 mb-4 border-b border-brand-200 pb-4">
                  <p>التوصيل</p>
                  <p className="font-bold">{shipping === 0 ? 'مجاني' : `${shipping} د.ت`}</p>
                </div>
                <div className="flex justify-between text-lg font-bold text-brand-900 mb-2">
                  <p>الإجمالي</p>
                  <p>{total.toFixed(0)} د.ت</p>
                </div>
                <div className="mt-6">
                  <button
                    onClick={handleCheckout}
                    className="flex w-full items-center justify-center rounded-none bg-brand-900 px-6 py-5 text-lg font-bold text-white shadow-sm hover:bg-brand-800 transition-colors"
                  >
                    تأكيد الطلب
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
