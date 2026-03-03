import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Truck, CreditCard, ClipboardList, Check } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useOrderStore } from '@/store/orderStore'
import { formatCurrency } from '@/lib/utils'
import { toast } from 'sonner'

const shippingSchema = z.object({
    firstName: z.string().min(1, 'Required'),
    lastName: z.string().min(1, 'Required'),
    email: z.string().email('Invalid email'),
    phone: z.string().min(5, 'Invalid phone'),
    address: z.string().min(3, 'Required'),
    city: z.string().min(1, 'Required'),
    state: z.string().min(1, 'Required'),
    zip: z.string().min(3, 'Required'),
})

const paymentSchema = z.object({
    cardName: z.string().min(1, 'Required'),
    cardNumber: z.string().min(13, 'Invalid card'),
    expiry: z.string().regex(/^\d{2}\/\d{2}$/, 'MM/YY format'),
    cvc: z.string().min(3, 'Invalid CVC'),
})

const steps = [
    { id: 1, label: 'Shipping', icon: Truck },
    { id: 2, label: 'Payment', icon: CreditCard },
    { id: 3, label: 'Review', icon: ClipboardList },
]

export default function Checkout() {
    useEffect(() => { document.title = 'Checkout — FASHE' }, [])
    const [step, setStep] = useState(1)
    const [complete, setComplete] = useState(false)
    const [orderId, setOrderId] = useState('')
    const { items, getTotal, clearCart } = useCartStore()
    const placeOrder = useOrderStore((s) => s.placeOrder)
    const navigate = useNavigate()
    const [shippingData, setShippingData] = useState(null)
    const shipping = getTotal() >= 50 ? 0 : 5.99
    const total = getTotal() + shipping

    const shippingForm = useForm({ resolver: zodResolver(shippingSchema) })
    const paymentForm = useForm({ resolver: zodResolver(paymentSchema) })

    if (items.length === 0 && !complete) {
        return (
            <div className="container-main py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                <Link to="/shop" className="text-accent hover:underline">Continue Shopping</Link>
            </div>
        )
    }

    if (complete) {
        return (
            <div className="max-w-lg mx-auto py-24 px-4 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-24 h-24 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Check size={48} className="text-success" />
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="text-3xl sm:text-4xl font-bold mb-4 font-[family-name:var(--font-display)]">Thank You!</motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="text-[var(--text-secondary)] mb-6 text-lg">Your order has been confirmed.</motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                    className="text-sm text-[var(--text-muted)] mb-10">Order #{orderId}</motion.p>
                <div className="flex gap-3 justify-center">
                    <Link to="/orders" className="px-6 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-light transition-colors">View Orders</Link>
                    <Link to="/shop" className="px-6 py-3 border border-[var(--border)] rounded-xl text-sm font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">Continue Shopping</Link>
                </div>
            </div>
        )
    }

    const handlePlaceOrder = () => {
        const order = placeOrder(items, shippingData, total)
        setOrderId(order.id)
        clearCart()
        setComplete(true)
        toast.success('Order placed successfully!')
    }

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 page-padding">
            <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-display)] mb-10">Checkout</h1>

            {/* Stepper */}
            <div className="flex items-center justify-center mb-12">
                {steps.map((s, i) => (
                    <div key={s.id} className="flex items-center">
                        <div className="flex flex-col items-center">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-semibold transition-all ${step > s.id ? 'bg-success text-white shadow-lg shadow-green-500/20' : step === s.id ? 'bg-primary text-white shadow-lg' : 'bg-neutral-100 dark:bg-neutral-800 text-[var(--text-muted)]'}`}>
                                {step > s.id ? <Check size={20} /> : <s.icon size={20} />}
                            </div>
                            <span className={`text-xs mt-2 font-medium ${step >= s.id ? 'text-[var(--text)]' : 'text-[var(--text-muted)]'}`}>{s.label}</span>
                        </div>
                        {i < steps.length - 1 && <div className={`w-16 sm:w-28 h-0.5 mx-3 rounded-full transition-all ${step > s.id ? 'bg-success' : 'bg-neutral-200 dark:bg-neutral-700'}`} />}
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
                <div className="lg:col-span-2">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.form key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                className="space-y-5" onSubmit={shippingForm.handleSubmit((d) => { setShippingData(d); setStep(2) })}>
                                <h2 className="text-xl font-bold mb-5 font-[family-name:var(--font-display)]">Shipping Address</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <FormInput label="First Name" {...shippingForm.register('firstName')} error={shippingForm.formState.errors.firstName?.message} />
                                    <FormInput label="Last Name" {...shippingForm.register('lastName')} error={shippingForm.formState.errors.lastName?.message} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <FormInput label="Email" type="email" {...shippingForm.register('email')} error={shippingForm.formState.errors.email?.message} />
                                    <FormInput label="Phone" type="tel" {...shippingForm.register('phone')} error={shippingForm.formState.errors.phone?.message} />
                                </div>
                                <FormInput label="Address" {...shippingForm.register('address')} error={shippingForm.formState.errors.address?.message} />
                                <div className="grid grid-cols-3 gap-4">
                                    <FormInput label="City" {...shippingForm.register('city')} error={shippingForm.formState.errors.city?.message} />
                                    <FormInput label="State" {...shippingForm.register('state')} error={shippingForm.formState.errors.state?.message} />
                                    <FormInput label="ZIP" {...shippingForm.register('zip')} error={shippingForm.formState.errors.zip?.message} />
                                </div>
                                <div className="flex justify-end pt-4">
                                    <button type="submit" className="px-8 py-3.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-light transition-colors">Continue to Payment</button>
                                </div>
                            </motion.form>
                        )}
                        {step === 2 && (
                            <motion.form key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                className="space-y-5" onSubmit={paymentForm.handleSubmit(() => setStep(3))}>
                                <h2 className="text-xl font-bold mb-5 font-[family-name:var(--font-display)]">Payment Details</h2>
                                <FormInput label="Name on Card" {...paymentForm.register('cardName')} error={paymentForm.formState.errors.cardName?.message} />
                                <FormInput label="Card Number" placeholder="1234 5678 9012 3456" {...paymentForm.register('cardNumber')} error={paymentForm.formState.errors.cardNumber?.message} />
                                <div className="grid grid-cols-2 gap-4">
                                    <FormInput label="Expiry" placeholder="MM/YY" {...paymentForm.register('expiry')} error={paymentForm.formState.errors.expiry?.message} />
                                    <FormInput label="CVC" placeholder="123" {...paymentForm.register('cvc')} error={paymentForm.formState.errors.cvc?.message} />
                                </div>
                                <div className="flex justify-between pt-4">
                                    <button type="button" onClick={() => setStep(1)} className="px-6 py-3 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors">Back</button>
                                    <button type="submit" className="px-8 py-3.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-light transition-colors">Review Order</button>
                                </div>
                            </motion.form>
                        )}
                        {step === 3 && (
                            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                <h2 className="text-xl font-bold mb-5 font-[family-name:var(--font-display)]">Review Order</h2>
                                <div className="space-y-0">
                                    {items.map((item) => (
                                        <div key={item.key} className="flex gap-4 py-4 border-b border-[var(--border)]">
                                            <img src={item.image} alt={item.title} className="w-16 h-20 object-cover rounded-xl" />
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-semibold truncate">{item.title}</h4>
                                                <p className="text-xs text-[var(--text-muted)]">Qty: {item.quantity}</p>
                                            </div>
                                            <span className="text-sm font-bold">{formatCurrency(item.price * item.quantity)}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between pt-4">
                                    <button onClick={() => setStep(2)} className="px-6 py-3 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors">Back</button>
                                    <button onClick={handlePlaceOrder} className="px-8 py-3.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-light transition-colors">
                                        Place Order — {formatCurrency(total)}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                {/* Summary */}
                <div>
                    <div className="sticky top-28 bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-7 space-y-4">
                        <h3 className="font-bold font-[family-name:var(--font-display)]">Summary</h3>
                        <div className="text-sm space-y-2">
                            <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Subtotal ({items.length})</span><span className="font-semibold">{formatCurrency(getTotal())}</span></div>
                            <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Shipping</span><span className="font-semibold">{shipping === 0 ? <span className="text-success">Free</span> : formatCurrency(shipping)}</span></div>
                        </div>
                        <div className="border-t border-[var(--border)] pt-4 flex justify-between font-bold">
                            <span>Total</span><span className="text-lg">{formatCurrency(total)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

import { forwardRef } from 'react'
const FormInput = forwardRef(function FormInput({ label, error, ...props }, ref) {
    return (
        <div>
            {label && <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{label}</label>}
            <input ref={ref} {...props} className={`w-full rounded-xl border ${error ? 'border-red-400' : 'border-[var(--border)]'} bg-[var(--bg-card)] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all`} />
            {error && <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>}
        </div>
    )
})
