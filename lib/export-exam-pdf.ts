import type { Exam } from "@/types";

interface StudentScore {
  rank: number;
  name: string;
  score: number;
  correct: number;
  wrong: number;
  passed: boolean;
  time: string;
}

export function exportExamReportPdf(exam: Exam, students: StudentScore[], avgScore: number, passRate: number) {
  if (typeof window === "undefined") return;

  const printWindow = window.open("", "_blank", "width=850,height=900");
  if (!printWindow) {
    alert("Mohon izinkan pop-up browser untuk mencetak/mengunduh PDF.");
    return;
  }

  const currentDate = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const rowsHtml = students
    .map(
      (s) => `
    <tr style="border-bottom: 1px solid #e5e7eb;">
      <td style="padding: 8px 10px; text-align: center; font-weight: bold;">${s.rank}</td>
      <td style="padding: 8px 10px; font-weight: 600;">${s.name}</td>
      <td style="padding: 8px 10px; text-align: center;">${s.correct} / ${s.wrong}</td>
      <td style="padding: 8px 10px; text-align: center;">${s.time}</td>
      <td style="padding: 8px 10px; text-align: center; font-weight: 800; font-size: 13px;">${s.score}</td>
      <td style="padding: 8px 10px; text-align: center; font-weight: bold; color: ${s.passed ? "#1b5e20" : "#b71c1c"};">
        ${s.passed ? "TUNTAS" : "REMEDIAL"}
      </td>
    </tr>`
    )
    .join("");

  const content = `
  <!DOCTYPE html>
  <html lang="id">
  <head>
    <meta charset="UTF-8">
    <title>Rekap Nilai - ${exam.title}</title>
    <style>
      @page { size: A4 portrait; margin: 15mm 18mm; }
      body { font-family: 'Segoe UI', Arial, sans-serif; color: #2d1017; margin: 0; padding: 10px; font-size: 12px; }
      .header { text-align: center; border-bottom: 2px solid #451420; padding-bottom: 10px; margin-bottom: 15px; }
      .header h1 { margin: 0; font-size: 17px; font-weight: 900; color: #451420; text-transform: uppercase; }
      .header p { margin: 4px 0 0; font-size: 11px; color: #6b7280; }
      .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 20px; background: #faf7f2; border: 1px solid #e5d7dc; border-radius: 8px; padding: 12px 16px; margin-bottom: 15px; font-size: 11.5px; }
      .meta-item { display: flex; justify-content: space-between; }
      .meta-item strong { color: #451420; }
      .kpi-row { display: flex; gap: 10px; margin-bottom: 16px; }
      .kpi-card { flex: 1; border: 1px solid #e5d7dc; border-radius: 8px; padding: 8px 12px; text-align: center; background: #fff; }
      .kpi-card .val { font-size: 16px; font-weight: 900; color: #451420; margin-top: 2px; }
      .kpi-card .lbl { font-size: 9.5px; text-transform: uppercase; font-weight: 700; color: #7a5661; }
      table { width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 25px; }
      th { background: #451420; color: #fff; padding: 8px 10px; text-transform: uppercase; font-size: 10px; font-weight: 800; }
      .signature { display: flex; justify-content: space-between; margin-top: 30px; font-size: 11.5px; }
      .sign-box { text-align: center; width: 200px; }
      .sign-space { height: 60px; }
      @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>Laporan Hasil Belajar</h1>
      <p>Dibuat melalui platform satelyd.id</p>
    </div>
    <div class="meta-grid">
      <div class="meta-item"><span>Nama Ujian:</span> <strong>${exam.title}</strong></div>
      <div class="meta-item"><span>Mata Pelajaran:</span> <strong>${exam.subject}</strong></div>
      <div class="meta-item"><span>Tingkat / Kelas:</span> <strong>${exam.gradeLevel}</strong></div>
      <div class="meta-item"><span>Kode Token:</span> <strong style="font-family: monospace;">${exam.tokenCode}</strong></div>
      <div class="meta-item"><span>Kriteria Ketuntasan (KKM):</span> <strong>${exam.passingScore}</strong></div>
      <div class="meta-item"><span>Tanggal Pelaksanaan:</span> <strong>${currentDate}</strong></div>
    </div>
    <div class="kpi-row">
      <div class="kpi-card"><div class="lbl">Rata-Rata Nilai</div><div class="val">${avgScore}</div></div>
      <div class="kpi-card"><div class="lbl">Persentase Tuntas</div><div class="val" style="color: #1b5e20;">${passRate}%</div></div>
      <div class="kpi-card"><div class="lbl">Nilai Tertinggi</div><div class="val">92</div></div>
      <div class="kpi-card"><div class="lbl">Total Peserta</div><div class="val">${students.length} Siswa</div></div>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width: 35px;">No</th>
          <th>Nama Peserta Didik</th>
          <th style="width: 80px;">Benar / Salah</th>
          <th style="width: 75px;">Waktu</th>
          <th style="width: 75px;">Nilai Akhir</th>
          <th style="width: 85px;">Keterangan</th>
        </tr>
      </thead>
      <tbody>${rowsHtml}</tbody>
    </table>
    <div class="signature">
      <div class="sign-box">
        <div>Mengetahui,</div>
        <div>Wali Kelas</div>
        <div class="sign-space"></div>
        <div style="border-bottom: 1px solid #333; font-weight: bold;">( ..................................... )</div>
      </div>
      <div class="sign-box">
        <div>${currentDate}</div>
        <div>Guru Pengampu Mata Pelajaran</div>
        <div class="sign-space"></div>
        <div style="border-bottom: 1px solid #333; font-weight: bold;">( ..................................... )</div>
      </div>
    </div>
    <script>window.onload = function() { window.print(); };</script>
  </body>
  </html>`;

  printWindow.document.open();
  printWindow.document.write(content);
  printWindow.document.close();
}
