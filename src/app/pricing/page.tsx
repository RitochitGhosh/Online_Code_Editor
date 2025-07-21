import { currentUser } from '@clerk/nextjs/server';
import PricingPageClient from './_components/PricingPageClient';

async function PricingPage() {
    const user = await currentUser();
    const userId = user?.id || "";
    
  return (
    <PricingPageClient userId={userId} />
  )
}

export default PricingPage