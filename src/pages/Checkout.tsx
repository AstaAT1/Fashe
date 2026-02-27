import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { HiCheck, HiOutlineTruck, HiOutlineCreditCard, HiOutlineClipboardList } from 'react-icons/hi';
import { useDocumentTitle } from '@/hooks';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { formatCurrency } from '@/utils';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { Link } from 'react-router-dom';

const steps = [
    { id: 1, label: 'Shipping', icon: HiOutlineTruck },
    { id: 2, label: 'Payment', icon: HiOutlineCreditCard },
    { id: 3, label: 'Review', icon: HiOutlineClipboardList },
];

export default function Checkout() {
    useDocumentTitle('Checkout');
    const [step, setStep] = useState(1);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const { items, getTotal, clearCart } = useCartStore();
    const { addToast } = useUIStore();

    const shipping = getTotal() >= 50 ? 0 : 5.99;
    const total = getTotal() + shipping;

    const shippingForm = useForm({
        defaultValues: {
            firstName: '', lastName: '', email: '', phone: '',
            address: '', city: '', state: '', zip: '', country: 'United States',
        },
    });

    const paymentForm = useForm({
        defaultValues: {
            cardName: '', cardNumber: '', expiry: '', cvc: '',
        },
    });

    const handlePlaceOrder = () => {
        setOrderPlaced(true);
        clearCart();
        addToast({ message: 'Order placed successfully!', type: 'success' });
    };

    if (items.length === 0 && !orderPlaced) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                <Link to="/shop"><Button>Continue Shopping</Button></Link>
            </div>
        );
    }

    if (orderPlaced) {
        return (
            <div className="max-w-lg mx-auto px-4 py-20 text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-20 h-20 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                    <HiCheck className="w-10 h-10 text-green-600 dark:text-green-400" />
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-bold mb-3"
                >
                    Thank You!
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-[var(--text-secondary)] mb-8"
                >
                    Your order has been confirmed. We'll send you a confirmation email shortly.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-3"
                >
                    <p className="text-sm text-[var(--text-muted)]">
                        Order #FASHE-{Date.now().toString(36).toUpperCase()}
                    </p>
                    <Link to="/shop"><Button>Continue Shopping</Button></Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Breadcrumbs />
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            {/* Stepper */}
            <div className="flex items-center justify-center mb-10">
                {steps.map((s, i) => (
                    <div key={s.id} className="flex items-center">
                        <div className="flex flex-col items-center">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${step > s.id
                                        ? 'bg-green-500 text-white'
                                        : step === s.id
                                            ? 'bg-primary-950 text-white dark:bg-primary-100 dark:text-primary-950'
                                            : 'bg-surface-100 dark:bg-surface-800 text-[var(--text-muted)]'
                                    }`}
                            >
                                {step > s.id ? <HiCheck className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                            </div>
                            <span className="text-xs mt-1.5 font-medium text-[var(--text-secondary)]">{s.label}</span>
                        </div>
                        {i < steps.length - 1 && (
                            <div className={`w-16 sm:w-24 h-0.5 mx-2 transition-colors ${step > s.id ? 'bg-green-500' : 'bg-surface-200 dark:bg-surface-700'}`} />
                        )}
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <AnimatePresence mode="wait">
                        {/* Step 1: Shipping */}
                        {step === 1 && (
                            <motion.form
                                key="shipping"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                                onSubmit={shippingForm.handleSubmit(() => setStep(2))}
                            >
                                <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="First Name" {...shippingForm.register('firstName', { required: true })} error={shippingForm.formState.errors.firstName ? 'Required' : undefined} />
                                    <Input label="Last Name" {...shippingForm.register('lastName', { required: true })} error={shippingForm.formState.errors.lastName ? 'Required' : undefined} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="Email" type="email" {...shippingForm.register('email', { required: true })} error={shippingForm.formState.errors.email ? 'Required' : undefined} />
                                    <Input label="Phone" type="tel" {...shippingForm.register('phone', { required: true })} error={shippingForm.formState.errors.phone ? 'Required' : undefined} />
                                </div>
                                <Input label="Address" {...shippingForm.register('address', { required: true })} error={shippingForm.formState.errors.address ? 'Required' : undefined} />
                                <div className="grid grid-cols-3 gap-4">
                                    <Input label="City" {...shippingForm.register('city', { required: true })} error={shippingForm.formState.errors.city ? 'Required' : undefined} />
                                    <Input label="State" {...shippingForm.register('state', { required: true })} error={shippingForm.formState.errors.state ? 'Required' : undefined} />
                                    <Input label="ZIP Code" {...shippingForm.register('zip', { required: true })} error={shippingForm.formState.errors.zip ? 'Required' : undefined} />
                                </div>
                                <div className="flex justify-end pt-4">
                                    <Button type="submit" size="lg">Continue to Payment</Button>
                                </div>
                            </motion.form>
                        )}

                        {/* Step 2: Payment */}
                        {step === 2 && (
                            <motion.form
                                key="payment"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                                onSubmit={paymentForm.handleSubmit(() => setStep(3))}
                            >
                                <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                                <Input label="Name on Card" {...paymentForm.register('cardName', { required: true })} error={paymentForm.formState.errors.cardName ? 'Required' : undefined} />
                                <Input label="Card Number" placeholder="1234 5678 9012 3456" {...paymentForm.register('cardNumber', { required: true })} error={paymentForm.formState.errors.cardNumber ? 'Required' : undefined} />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="Expiry" placeholder="MM/YY" {...paymentForm.register('expiry', { required: true })} error={paymentForm.formState.errors.expiry ? 'Required' : undefined} />
                                    <Input label="CVC" placeholder="123" {...paymentForm.register('cvc', { required: true })} error={paymentForm.formState.errors.cvc ? 'Required' : undefined} />
                                </div>
                                <div className="flex justify-between pt-4">
                                    <Button type="button" variant="ghost" onClick={() => setStep(1)}>Back</Button>
                                    <Button type="submit" size="lg">Review Order</Button>
                                </div>
                            </motion.form>
                        )}

                        {/* Step 3: Review */}
                        {step === 3 && (
                            <motion.div
                                key="review"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="text-xl font-semibold mb-4">Review Order</h2>
                                <div className="space-y-3">
                                    {items.map((item) => (
                                        <div key={item.productId} className="flex gap-3 py-3 border-b border-[var(--border)]">
                                            <img src={item.image} alt={item.title} className="w-16 h-20 object-cover rounded-lg" />
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium">{item.title}</h4>
                                                <p className="text-xs text-[var(--text-muted)]">Qty: {item.quantity}</p>
                                            </div>
                                            <span className="text-sm font-semibold">{formatCurrency(item.price * item.quantity)}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between pt-4">
                                    <Button type="button" variant="ghost" onClick={() => setStep(2)}>Back</Button>
                                    <Button size="lg" onClick={handlePlaceOrder}>Place Order — {formatCurrency(total)}</Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Order Summary Sidebar */}
                <div>
                    <div className="sticky top-24 bg-surface-50 dark:bg-surface-900 rounded-2xl p-6 space-y-3">
                        <h3 className="font-semibold mb-2">Order Summary</h3>
                        <div className="text-sm space-y-2">
                            <div className="flex justify-between">
                                <span className="text-[var(--text-secondary)]">Subtotal ({items.length} items)</span>
                                <span>{formatCurrency(getTotal())}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[var(--text-secondary)]">Shipping</span>
                                <span>{shipping === 0 ? <span className="text-green-600">Free</span> : formatCurrency(shipping)}</span>
                            </div>
                        </div>
                        <div className="border-t border-[var(--border)] pt-3 flex justify-between font-semibold">
                            <span>Total</span>
                            <span>{formatCurrency(total)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
