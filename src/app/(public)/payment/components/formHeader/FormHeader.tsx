import { toast } from "react-toastify"

interface HeaderProps {
    step: number
    // handlePrevious: (step: number) => void
    // moveToTheNextForm: (step: number) => void
    setStep: (step: number) => void
    isValidAddress: boolean
}

export default function FormHeader({ step, setStep, isValidAddress }: HeaderProps) {

    const sections = [
        { id: 1, section: 'Endereço' },
        { id: 2, section: 'Pagamento' },
        { id: 3, section: 'Pedido' },
    ]

    function toMove(id: number) {
        if (!isValidAddress) {
            return toast.error('Preencha os campos', {
                style: {
                    width: '350px'
                }
            })
        }

        if (step === id) return
        setStep(id)
    }

    return (
        <div className='flex justify-between mb-4 py-2'>
            {sections?.map(item => (
                <h1 key={item.id}
                    className={`paymentFormHeader cursor-pointer ${step === item.id ? 'border-b-2' : 'opacity-50 border-b-2'}`}
                    onClick={() => toMove(item.id)}
                >
                    {`${item.id}. ${item.section}`}
                </h1>

            ))}
        </div>
    );
};