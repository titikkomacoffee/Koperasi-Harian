export default function KasBank(){
  const kas = [
    { bank: 'Allo Bank', no: '085142977371', nama: 'KOPERASI TRI PUTRA ABADI', saldo: 0 },
    { bank: 'BCA', no: '3141923739', nama: 'KOPERASI TRI PUTRA ABADI', saldo: 0 },
    { bank: 'Kas Kecil', no: '-', nama: 'Kas Tunai', saldo: 0 },
  ]
  return (
    <div className="p-4 space-y-3">
      <h1 className="font-bold">Kas & Bank</h1>
      <div className="grid md:grid-cols-3 gap-3">
        {kas.map((k,i)=>(
          <div key={i} className="bg-white rounded-2xl p-4 border">
            <p className="text-xs font-bold">{k.bank}</p>
            <p className="text-[11px] text-gray-500">{k.no} • {k.nama}</p>
            <p className="font-bold mt-3">Rp {k.saldo.toLocaleString('id-ID')}</p>
          </div>
        ))}
      </div>
    </div>
  )
        }
