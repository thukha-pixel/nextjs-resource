'use client';

import {useFormStatus} from 'react-dom';

const MealsFormSubmit = () => {
    /**
     * React dom က import လုပ်ပြီး next js မှာပဲ အလုပ်လုပ်တယ်...
     * use client မှာပဲ အလုပ်လုပ်တယ်...
     * */ 
    const { pending } = useFormStatus();

    return <button disabled={pending}>{pending ? 'Submitting...' : 'Share Meal' }</button>
}

export default MealsFormSubmit;