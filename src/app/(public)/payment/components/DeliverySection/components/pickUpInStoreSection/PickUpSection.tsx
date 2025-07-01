import { motion } from 'framer-motion'
import PickupInstructions from "../pickupSection/PickupInstructions";
import PickupMap from "../pickupSection/map/map";
import { ArrowRight } from 'lucide-react';



export default function PickUpSection({ moveToTheNextForm }: { moveToTheNextForm: () => void }) {
    return (
        <motion.div className='flex flex-col space-y-4' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <PickupInstructions />
            <PickupMap />
            <div className='flex justify-end'>
                <button type='submit' className="buttonColor flex items-center justify-center gap-x-2 px-20 py-3 w-full md:max-w-70 m-auto md:m-0" onClick={moveToTheNextForm}>Proximo <ArrowRight size={18} /></button>
            </div>
        </motion.div>
    );
};