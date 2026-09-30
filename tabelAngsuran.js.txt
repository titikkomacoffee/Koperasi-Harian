// TABEL ANGSURAN KOPERASI TRI PUTRA ABADI - Sesuai gambar
// Dibuat berdasarkan gambar Tabel Angsuran Harian & Bulanan

export const tabelHarian = {
  // key: jumlah pinjaman, value: { tenor: angsuran }
  200000: { '24 Hari': 13000, '30 Hari': 10000 },
  500000: { '24 Hari': 25000, '30 Hari': 20000, '45 Hari': 15000 },
  700000: { '24 Hari': 35000, '30 Hari': 30000, '45 Hari': 20000, '60 Hari': 15000, '70 Hari': 13000 },
  1000000: { '24 Hari': 50000, '30 Hari': 40000, '45 Hari': 30000, '60 Hari': 20000, '70 Hari': 10000 },
}

export const tabelBulanan = {
  500000: { '3 Bulan': 200000, '6 Bulan': 110000, '9 Bulan': 80000, '12 Bulan': 65000, '15 Bulan': 55000 },
  1000000: { '3 Bulan': 400000, '6 Bulan': 200000, '9 Bulan': 140000, '12 Bulan': 110000, '15 Bulan': 90000 },
  1500000: { '3 Bulan': 600000, '6 Bulan': 300000, '9 Bulan': 195000, '12 Bulan': 150000, '15 Bulan': 125000 },
  2000000: { '3 Bulan': 750000, '6 Bulan': 370000, '9 Bulan': 250000, '12 Bulan': 195000, '15 Bulan': 160000 },
  2500000: { '3 Bulan': 950000, '6 Bulan': 435000, '9 Bulan': 365000, '12 Bulan': 275000, '15 Bulan': 225000 },
  3000000: { '3 Bulan': 1220000, '6 Bulan': 620000, '9 Bulan': 420000, '12 Bulan': 320000, '15 Bulan': 260000 },
  4000000: { '3 Bulan': 1370000, '6 Bulan': 470000, '9 Bulan': 475000, '12 Bulan': 360000, '15 Bulan': 290000 },
  4500000: { '3 Bulan': 1550000, '6 Bulan': 525000, '9 Bulan': 530000, '12 Bulan': 400000, '15 Bulan': 325000 },
  5000000: { '3 Bulan': 1720000, '6 Bulan': 580000, '9 Bulan': 585000, '12 Bulan': 445000, '15 Bulan': 360000 },
}

export const tenorHarian = ['24 Hari', '30 Hari', '45 Hari', '60 Hari', '70 Hari']
export const tenorBulanan = ['3 Bulan', '6 Bulan', '9 Bulan', '12 Bulan', '15 Bulan']
export const semuaTenor = [...tenorHarian, ...tenorBulanan]

export const pilihanPinjaman = [
  // Harian
  { id: 'harian-200-24', jumlah: 200000, tenor: '24 Hari', angsuran: 13000, tipe: 'harian', label: 'Rp200.000 - 24 Hari (Rp13.000/hari)' },
  { id: 'harian-200-30', jumlah: 200000, tenor: '30 Hari', angsuran: 10000, tipe: 'harian', label: 'Rp200.000 - 30 Hari (Rp10.000/hari)' },
  { id: 'harian-500-24', jumlah: 500000, tenor: '24 Hari', angsuran: 25000, tipe: 'harian', label: 'Rp500.000 - 24 Hari (Rp25.000/hari)' },
  { id: 'harian-500-30', jumlah: 500000, tenor: '30 Hari', angsuran: 20000, tipe: 'harian', label: 'Rp500.000 - 30 Hari (Rp20.000/hari)' },
  { id: 'harian-500-45', jumlah: 500000, tenor: '45 Hari', angsuran: 15000, tipe: 'harian', label: 'Rp500.000 - 45 Hari (Rp15.000/hari)' },
  { id: 'harian-700-24', jumlah: 700000, tenor: '24 Hari', angsuran: 35000, tipe: 'harian', label: 'Rp700.000 - 24 Hari (Rp35.000/hari)' },
  { id: 'harian-700-30', jumlah: 700000, tenor: '30 Hari', angsuran: 30000, tipe: 'harian', label: 'Rp700.000 - 30 Hari (Rp30.000/hari)' },
  { id: 'harian-700-45', jumlah: 700000, tenor: '45 Hari', angsuran: 20000, tipe: 'harian', label: 'Rp700.000 - 45 Hari (Rp20.000/hari)' },
  { id: 'harian-700-60', jumlah: 700000, tenor: '60 Hari', angsuran: 15000, tipe: 'harian', label: 'Rp700.000 - 60 Hari (Rp15.000/hari)' },
  { id: 'harian-700-70', jumlah: 700000, tenor: '70 Hari', angsuran: 13000, tipe: 'harian', label: 'Rp700.000 - 70 Hari (Rp13.000/hari)' },
  { id: 'harian-1000-24', jumlah: 1000000, tenor: '24 Hari', angsuran: 50000, tipe: 'harian', label: 'Rp1.000.000 - 24 Hari (Rp50.000/hari)' },
  { id: 'harian-1000-30', jumlah: 1000000, tenor: '30 Hari', angsuran: 40000, tipe: 'harian', label: 'Rp1.000.000 - 30 Hari (Rp40.000/hari)' },
  { id: 'harian-1000-45', jumlah: 1000000, tenor: '45 Hari', angsuran: 30000, tipe: 'harian', label: 'Rp1.000.000 - 45 Hari (Rp30.000/hari)' },
  { id: 'harian-1000-60', jumlah: 1000000, tenor: '60 Hari', angsuran: 20000, tipe: 'harian', label: 'Rp1.000.000 - 60 Hari (Rp20.000/hari)' },
  { id: 'harian-1000-70', jumlah: 1000000, tenor: '70 Hari', angsuran: 10000, tipe: 'harian', label: 'Rp1.000.000 - 70 Hari (Rp10.000/hari)' },
  // Bulanan
  { id: 'bulanan-500-3', jumlah: 500000, tenor: '3 Bulan', angsuran: 200000, tipe: 'bulanan', label: 'Rp500.000 - 3 Bulan (Rp200.000/bln)' },
  { id: 'bulanan-500-6', jumlah: 500000, tenor: '6 Bulan', angsuran: 110000, tipe: 'bulanan', label: 'Rp500.000 - 6 Bulan (Rp110.000/bln)' },
  { id: 'bulanan-500-9', jumlah: 500000, tenor: '9 Bulan', angsuran: 80000, tipe: 'bulanan', label: 'Rp500.000 - 9 Bulan (Rp80.000/bln)' },
  { id: 'bulanan-500-12', jumlah: 500000, tenor: '12 Bulan', angsuran: 65000, tipe: 'bulanan', label: 'Rp500.000 - 12 Bulan (Rp65.000/bln)' },
  { id: 'bulanan-500-15', jumlah: 500000, tenor: '15 Bulan', angsuran: 55000, tipe: 'bulanan', label: 'Rp500.000 - 15 Bulan (Rp55.000/bln)' },
  { id: 'bulanan-1000-3', jumlah: 1000000, tenor: '3 Bulan', angsuran: 400000, tipe: 'bulanan', label: 'Rp1.000.000 - 3 Bulan (Rp400.000/bln)' },
  { id: 'bulanan-1000-6', jumlah: 1000000, tenor: '6 Bulan', angsuran: 200000, tipe: 'bulanan', label: 'Rp1.000.000 - 6 Bulan (Rp200.000/bln)' },
  { id: 'bulanan-1000-9', jumlah: 1000000, tenor: '9 Bulan', angsuran: 140000, tipe: 'bulanan', label: 'Rp1.000.000 - 9 Bulan (Rp140.000/bln)' },
  { id: 'bulanan-1000-12', jumlah: 1000000, tenor: '12 Bulan', angsuran: 110000, tipe: 'bulanan', label: 'Rp1.000.000 - 12 Bulan (Rp110.000/bln)' },
  { id: 'bulanan-1000-15', jumlah: 1000000, tenor: '15 Bulan', angsuran: 90000, tipe: 'bulanan', label: 'Rp1.000.000 - 15 Bulan (Rp90.000/bln)' },
  { id: 'bulanan-1500-3', jumlah: 1500000, tenor: '3 Bulan', angsuran: 600000, tipe: 'bulanan', label: 'Rp1.500.000 - 3 Bulan (Rp600.000/bln)' },
  { id: 'bulanan-1500-6', jumlah: 1500000, tenor: '6 Bulan', angsuran: 300000, tipe: 'bulanan', label: 'Rp1.500.000 - 6 Bulan (Rp300.000/bln)' },
  { id: 'bulanan-1500-9', jumlah: 1500000, tenor: '9 Bulan', angsuran: 195000, tipe: 'bulanan', label: 'Rp1.500.000 - 9 Bulan (Rp195.000/bln)' },
  { id: 'bulanan-1500-12', jumlah: 1500000, tenor: '12 Bulan', angsuran: 150000, tipe: 'bulanan', label: 'Rp1.500.000 - 12 Bulan (Rp150.000/bln)' },
  { id: 'bulanan-1500-15', jumlah: 1500000, tenor: '15 Bulan', angsuran: 125000, tipe: 'bulanan', label: 'Rp1.500.000 - 15 Bulan (Rp125.000/bln)' },
  { id: 'bulanan-2000-3', jumlah: 2000000, tenor: '3 Bulan', angsuran: 750000, tipe: 'bulanan', label: 'Rp2.000.000 - 3 Bulan (Rp750.000/bln)' },
  { id: 'bulanan-2000-6', jumlah: 2000000, tenor: '6 Bulan', angsuran: 370000, tipe: 'bulanan', label: 'Rp2.000.000 - 6 Bulan (Rp370.000/bln)' },
  { id: 'bulanan-2000-9', jumlah: 2000000, tenor: '9 Bulan', angsuran: 250000, tipe: 'bulanan', label: 'Rp2.000.000 - 9 Bulan (Rp250.000/bln)' },
  { id: 'bulanan-2000-12', jumlah: 2000000, tenor: '12 Bulan', angsuran: 195000, tipe: 'bulanan', label: 'Rp2.000.000 - 12 Bulan (Rp195.000/bln)' },
  { id: 'bulanan-2000-15', jumlah: 2000000, tenor: '15 Bulan', angsuran: 160000, tipe: 'bulanan', label: 'Rp2.000.000 - 15 Bulan (Rp160.000/bln)' },
  { id: 'bulanan-2500-3', jumlah: 2500000, tenor: '3 Bulan', angsuran: 950000, tipe: 'bulanan', label: 'Rp2.500.000 - 3 Bulan (Rp950.000/bln)' },
  { id: 'bulanan-2500-6', jumlah: 2500000, tenor: '6 Bulan', angsuran: 435000, tipe: 'bulanan', label: 'Rp2.500.000 - 6 Bulan (Rp435.000/bln)' },
  { id: 'bulanan-2500-9', jumlah: 2500000, tenor: '9 Bulan', angsuran: 365000, tipe: 'bulanan', label: 'Rp2.500.000 - 9 Bulan (Rp365.000/bln)' },
  { id: 'bulanan-2500-12', jumlah: 2500000, tenor: '12 Bulan', angsuran: 275000, tipe: 'bulanan', label: 'Rp2.500.000 - 12 Bulan (Rp275.000/bln)' },
  { id: 'bulanan-2500-15', jumlah: 2500000, tenor: '15 Bulan', angsuran: 225000, tipe: 'bulanan', label: 'Rp2.500.000 - 15 Bulan (Rp225.000/bln)' },
  { id: 'bulanan-3000-3', jumlah: 3000000, tenor: '3 Bulan', angsuran: 1220000, tipe: 'bulanan', label: 'Rp3.000.000 - 3 Bulan (Rp1.220.000/bln)' },
  { id: 'bulanan-3000-6', jumlah: 3000000, tenor: '6 Bulan', angsuran: 620000, tipe: 'bulanan', label: 'Rp3.000.000 - 6 Bulan (Rp620.000/bln)' },
  { id: 'bulanan-3000-9', jumlah: 3000000, tenor: '9 Bulan', angsuran: 420000, tipe: 'bulanan', label: 'Rp3.000.000 - 9 Bulan (Rp420.000/bln)' },
  { id: 'bulanan-3000-12', jumlah: 3000000, tenor: '12 Bulan', angsuran: 320000, tipe: 'bulanan', label: 'Rp3.000.000 - 12 Bulan (Rp320.000/bln)' },
  { id: 'bulanan-3000-15', jumlah: 3000000, tenor: '15 Bulan', angsuran: 260000, tipe: 'bulanan', label: 'Rp3.000.000 - 15 Bulan (Rp260.000/bln)' },
  { id: 'bulanan-4000-3', jumlah: 4000000, tenor: '3 Bulan', angsuran: 1370000, tipe: 'bulanan', label: 'Rp4.000.000 - 3 Bulan (Rp1.370.000/bln)' },
  { id: 'bulanan-4000-6', jumlah: 4000000, tenor: '6 Bulan', angsuran: 470000, tipe: 'bulanan', label: 'Rp4.000.000 - 6 Bulan (Rp470.000/bln)' },
  { id: 'bulanan-4000-9', jumlah: 4000000, tenor: '9 Bulan', angsuran: 475000, tipe: 'bulanan', label: 'Rp4.000.000 - 9 Bulan (Rp475.000/bln)' },
  { id: 'bulanan-4000-12', jumlah: 4000000, tenor: '12 Bulan', angsuran: 360000, tipe: 'bulanan', label: 'Rp4.000.000 - 12 Bulan (Rp360.000/bln)' },
  { id: 'bulanan-4000-15', jumlah: 4000000, tenor: '15 Bulan', angsuran: 290000, tipe: 'bulanan', label: 'Rp4.000.000 - 15 Bulan (Rp290.000/bln)' },
  { id: 'bulanan-4500-3', jumlah: 4500000, tenor: '3 Bulan', angsuran: 1550000, tipe: 'bulanan', label: 'Rp4.500.000 - 3 Bulan (Rp1.550.000/bln)' },
  { id: 'bulanan-4500-6', jumlah: 4500000, tenor: '6 Bulan', angsuran: 525000, tipe: 'bulanan', label: 'Rp4.500.000 - 6 Bulan (Rp525.000/bln)' },
  { id: 'bulanan-4500-9', jumlah: 4500000, tenor: '9 Bulan', angsuran: 530000, tipe: 'bulanan', label: 'Rp4.500.000 - 9 Bulan (Rp530.000/bln)' },
  { id: 'bulanan-4500-12', jumlah: 4500000, tenor: '12 Bulan', angsuran: 400000, tipe: 'bulanan', label: 'Rp4.500.000 - 12 Bulan (Rp400.000/bln)' },
  { id: 'bulanan-4500-15', jumlah: 4500000, tenor: '15 Bulan', angsuran: 325000, tipe: 'bulanan', label: 'Rp4.500.000 - 15 Bulan (Rp325.000/bln)' },
  { id: 'bulanan-5000-3', jumlah: 5000000, tenor: '3 Bulan', angsuran: 1720000, tipe: 'bulanan', label: 'Rp5.000.000 - 3 Bulan (Rp1.720.000/bln)' },
  { id: 'bulanan-5000-6', jumlah: 5000000, tenor: '6 Bulan', angsuran: 580000, tipe: 'bulanan', label: 'Rp5.000.000 - 6 Bulan (Rp580.000/bln)' },
  { id: 'bulanan-5000-9', jumlah: 5000000, tenor: '9 Bulan', angsuran: 585000, tipe: 'bulanan', label: 'Rp5.000.000 - 9 Bulan (Rp585.000/bln)' },
  { id: 'bulanan-5000-12', jumlah: 5000000, tenor: '12 Bulan', angsuran: 445000, tipe: 'bulanan', label: 'Rp5.000.000 - 12 Bulan (Rp445.000/bln)' },
  { id: 'bulanan-5000-15', jumlah: 5000000, tenor: '15 Bulan', angsuran: 360000, tipe: 'bulanan', label: 'Rp5.000.000 - 15 Bulan (Rp360.000/bln)' },
]

export function getAngsuran(jumlah, tenor) {
  const found = pilihanPinjaman.find(p => p.jumlah === jumlah && p.tenor === tenor)
  return found ? found.angsuran : null
}
