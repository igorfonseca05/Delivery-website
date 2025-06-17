

export default function FormHeader({ step }: { step: number }) {

    const sections = [
        { id: 1, section: 'Endereço' },
        { id: 2, section: 'Pagamento' },
        { id: 3, section: 'Pedido' },
    ]

    return (
        <div className='flex justify-between mb-4 py-2'>
            {sections?.map(item => (
                <h1 key={item.id}
                    className={`paymentFormHeader ${step === item.id ? 'border-b-2' :
                        'opacity-50 border-b-2'}`}>{`${item.id}. ${item.section}`}</h1>
            ))}
        </div>
    );
};