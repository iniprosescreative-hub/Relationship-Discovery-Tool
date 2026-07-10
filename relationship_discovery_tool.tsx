import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Map, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight, 
  Info,
  ShieldAlert,
  MessageSquareHeart,
  BarChart3,
  CalendarDays,
  Target
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const RelationshipTool = () => {
  const [step, setStep] = useState('onboarding'); // onboarding, form, dashboard, conversation
  
  // State for Form Inputs
  const [formData, setFormData] = useState({
    umur: '25-30',
    durasi: '1-3 tahun',
    status: 'Pacaran',
    agama: 'Sama',
    targetNikah: '1-2 tahun',
    kepribadian: 'Sama-sama Extrovert',
    pernahMenikah: 'Belum',
    topikSensitif: []
  });

  // Mock Data for Analytics
  const [coverageData] = useState([
    { area: 'Keuangan', score: 85, color: 'bg-emerald-500' },
    { area: 'Keluarga', score: 90, color: 'bg-emerald-500' },
    { area: 'Anak', score: 40, color: 'bg-amber-500' },
    { area: 'Karier', score: 70, color: 'bg-emerald-500' },
    { area: 'Seksualitas', score: 10, color: 'bg-rose-500' },
    { area: 'Mental Health', score: 20, color: 'bg-rose-500' },
    { area: 'Manajemen Konflik', score: 60, color: 'bg-amber-500' }
  ]);

  const radarData = {
    dipahami: 45, // Area yang sudah dipahami
    asumsi: 35,   // Area yang masih asumsi
    belumBahas: 20 // Area yang belum pernah dibahas
  };

  // Mock Data for Conversation Content based on Framework
  const conversationRoadmap = {
    minggu1: {
      title: "Fondasi & Akar (Keluarga & Masa Lalu)",
      description: "Memahami bagaimana keluarga membentuk pola pikir masing-masing.",
      items: [
        {
          id: "q1",
          pertanyaan: "Bagaimana hubunganmu dengan ayah dan ibumu saat tumbuh dewasa?",
          alasan: "Orang dengan unresolved family issue sering membawa pola tersebut (attachment style) ke pernikahan tanpa disadari.",
          followUpA: { kondisi: "Jika dia bercerita tentang trauma/konflik", tanya: "Bagaimana cara kamu berdamai atau menghadapi perasaan itu sekarang?" },
          followUpB: { kondisi: "Jika dia bilang 'biasa aja' atau terlalu sempurna", tanya: "Apa hal yang paling kamu ingat saat orang tuamu sedang bertengkar?" },
          warning: "Jangan bertindak sebagai terapis. Dengarkan tanpa menghakimi. Perhatikan jika ada indikasi 'victim mentality' atau penolakan menceritakan kelemahan keluarga.",
          insight: "Mendeteksi kemungkinan: secure attachment (jika bercerita objektif), avoidant (jika menghindar/meremehkan masa lalu)."
        },
        {
          id: "q2",
          pertanyaan: "Bagaimana caramu mengambil keputusan jika orang tua punya pendapat berbeda denganmu?",
          alasan: "Untuk melihat batas (boundaries) antara dirinya dan keluarganya kelak setelah menikah.",
          followUpA: { kondisi: "Jika dia selalu ikut orang tua", tanya: "Bagaimana jika suatu saat keputusanku sebagai pasangan bertentangan dengan orang tuamu?" },
          followUpB: { kondisi: "Jika dia dominan menolak ortu", tanya: "Apakah itu membuat hubunganmu dengan mereka menjadi tegang?" },
          warning: "Perhatikan kata 'berbakti'. Kadang kata ini disalahartikan menjadi 'tidak berani berkata tidak' pada orang tua.",
          insight: "Mendeteksi kemungkinan: people pleaser (ke orang tua), lack of boundaries."
        }
      ]
    },
    minggu2: {
       title: "Transparansi & Keamanan (Keuangan)",
       description: "Membahas nilai dan habit terkait uang, bukan sekadar angka.",
       items: [
           {
               id: "q3",
               pertanyaan: "Apa ketakutan terbesarmu soal uang?",
               alasan: "Uang bukan sekadar alat tukar, tapi representasi dari 'rasa aman' (security) bagi banyak orang.",
               followUpA: { kondisi: "Takut tidak cukup/miskin", tanya: "Apa yang biasa kamu lakukan saat merasa keuangan sedang menipis?" },
               followUpB: { kondisi: "Takut bergantung pada orang lain", tanya: "Apakah itu alasanmu bekerja sangat keras? Bagaimana menyeimbangkannya kelak?" },
               warning: "Kalau dia selalu menghindar ketika membahas uang, jangan langsung menyimpulkan dia pelit. Cari tahu apakah ada trauma masa lalu terkait hutang keluarga.",
               insight: "Mendeteksi kemungkinan: scarcity mindset, financial anxiety."
           }
       ]
    }
  };

  const handleStart = () => setStep('form');
  const handleSubmitForm = (e) => {
    e.preventDefault();
    setStep('analyzing');
    setTimeout(() => setStep('dashboard'), 1500); // Simulate processing
  };
  const handleStartConversation = (week) => setStep(`conversation-${week}`);
  const handleBackToDashboard = () => setStep('dashboard');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (step === 'onboarding') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full border-t-4 border-t-indigo-600 shadow-xl">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
              <MessageSquareHeart className="w-8 h-8 text-indigo-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-slate-800 mb-4">
              Relationship Discovery Tool
            </CardTitle>
            <CardDescription className="text-lg text-slate-600">
              Bukan sekadar daftar pertanyaan. Ini adalah asisten untuk mengenal karakter asli calon pasanganmu sebelum mengambil keputusan besar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-slate-200 flex flex-col items-center text-center space-y-2">
                <Target className="w-6 h-6 text-emerald-500" />
                <h3 className="font-semibold text-slate-800">Tepat Sasaran</h3>
                <p className="text-sm text-slate-500">Menghasilkan roadmap percakapan berdasarkan profil unik hubunganmu.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200 flex flex-col items-center text-center space-y-2">
                <BarChart3 className="w-6 h-6 text-blue-500" />
                <h3 className="font-semibold text-slate-800">Analisis Mendalam</h3>
                <p className="text-sm text-slate-500">Memetakan area yang sudah dipahami dan yang masih menjadi asumsi.</p>
              </div>
            </div>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <p className="text-sm text-amber-800 italic">
                "Aku sayang dia, tapi takut baru tahu sifat aslinya setelah menikah."
              </p>
              <p className="text-sm text-amber-900 mt-2 font-medium">
                Mari hilangkan keraguan itu dengan percakapan yang bermakna, bukan sekadar obrolan receh.
              </p>
            </div>
          </CardContent>
          <CardFooter className="pt-6">
            <Button onClick={handleStart} className="w-full text-lg py-6 bg-indigo-600 hover:bg-indigo-700">
              Mulai Analisis Hubungan
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (step === 'form') {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4">
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle>Relationship Context</CardTitle>
            <CardDescription>Bantu kami memahami dinamika hubunganmu saat ini agar rekomendasi lebih akurat.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitForm} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Durasi Hubungan</label>
                  <select 
                    className="w-full p-3 rounded-md border border-slate-300 bg-white"
                    value={formData.durasi}
                    onChange={(e) => handleInputChange('durasi', e.target.value)}
                  >
                    <option>Kurang dari 6 bulan</option>
                    <option>6 bulan - 1 tahun</option>
                    <option>1-3 tahun</option>
                    <option>Lebih dari 3 tahun</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status Saat Ini</label>
                  <select 
                    className="w-full p-3 rounded-md border border-slate-300 bg-white"
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                  >
                    <option>PDKT</option>
                    <option>Pacaran Biasa</option>
                    <option>LDR (Jarak Jauh)</option>
                    <option>Taaruf</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Dinamika Kepribadian</label>
                  <select 
                    className="w-full p-3 rounded-md border border-slate-300 bg-white"
                    value={formData.kepribadian}
                    onChange={(e) => handleInputChange('kepribadian', e.target.value)}
                  >
                    <option>Sama-sama Extrovert</option>
                    <option>Sama-sama Introvert</option>
                    <option>Aku Extrovert, Dia Introvert</option>
                    <option>Aku Introvert, Dia Extrovert</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Menikah</label>
                  <select 
                    className="w-full p-3 rounded-md border border-slate-300 bg-white"
                    value={formData.targetNikah}
                    onChange={(e) => handleInputChange('targetNikah', e.target.value)}
                  >
                    <option>Tahun ini</option>
                    <option>1-2 tahun lagi</option>
                    <option>Masih lama (> 2 tahun)</option>
                    <option>Belum tahu</option>
                  </select>
                </div>
              </div>
              <Button type="submit" className="w-full bg-indigo-600 py-6 mt-8">
                Generate Framework
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'analyzing') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-semibold text-slate-800 animate-pulse">Memproses Relationship Stage...</h2>
        <p className="text-slate-500 mt-2">Menyiapkan Conversation Goal & Follow-up Generator</p>
      </div>
    );
  }

  if (step === 'dashboard') {
    return (
      <div className="min-h-screen bg-slate-100 p-4 md:p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <header className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Dashboard Hubungan</h1>
              <p className="text-slate-500">Framework percakapan berbasis analitik</p>
            </div>
          </header>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Left Column: Analytics */}
            <div className="md:col-span-1 space-y-6">
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Map className="w-5 h-5 text-indigo-500"/> Compatibility Radar
                  </CardTitle>
                  <CardDescription>Tingkat pemahaman hubungan saat ini</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-emerald-700 font-medium">Area yang sudah dipahami</span>
                      <span>{radarData.dipahami}%</span>
                    </div>
                    <Progress value={radarData.dipahami} className="h-2 bg-emerald-100 [&>div]:bg-emerald-500" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-amber-700 font-medium">Area yang masih asumsi</span>
                      <span>{radarData.asumsi}%</span>
                    </div>
                    <Progress value={radarData.asumsi} className="h-2 bg-amber-100 [&>div]:bg-amber-500" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-rose-700 font-medium">Area yang belum dibahas</span>
                      <span>{radarData.belumBahas}%</span>
                    </div>
                    <Progress value={radarData.belumBahas} className="h-2 bg-rose-100 [&>div]:bg-rose-500" />
                  </div>
                  <div className="mt-4 p-3 bg-slate-50 rounded-md text-xs text-slate-600 italic">
                    Fokus kita adalah memindahkan persentase "Asumsi" menjadi "Dipahami", bukan menilai kecocokan.
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-indigo-500"/> Conversation Coverage Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[250px] pr-4">
                    <div className="space-y-4">
                      {coverageData.map((item, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium text-slate-700">{item.area}</span>
                            <span className="text-slate-500">{item.score}%</span>
                          </div>
                          <Progress value={item.score} className={`h-1.5 bg-slate-100 [&>div]:${item.color}`} />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

            </div>

            {/* Right Column: Roadmap & Actions */}
            <div className="md:col-span-2 space-y-6">
              
              {/* Next Best Conversation Recommendation */}
              <Card className="border-l-4 border-l-indigo-600 bg-indigo-50/50">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant="outline" className="mb-2 bg-indigo-100 text-indigo-800 border-indigo-200">
                        Next Best Conversation
                      </Badge>
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">
                        Bahas Soal "Keluarga & Masa Lalu"
                      </h3>
                      <p className="text-slate-600 mb-4">
                        Berdasarkan durasi {formData.durasi} dan status {formData.status}, ini adalah fondasi yang krusial sebelum membahas hal teknis seperti keuangan.
                      </p>
                      <Button onClick={() => handleStartConversation('minggu1')} className="bg-indigo-600 hover:bg-indigo-700">
                        Mulai Sesi Percakapan <ChevronRight className="w-4 h-4 ml-1"/>
                      </Button>
                    </div>
                    <div className="hidden sm:block p-3 bg-white rounded-full shadow-sm">
                      <Target className="w-8 h-8 text-indigo-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Conversation Roadmap */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-indigo-500"/> Conversation Roadmap
                  </CardTitle>
                  <CardDescription>Rencana bertahap agar obrolan tidak terasa seperti interview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Week 1 */}
                    <div className="flex gap-4 p-4 border border-slate-200 rounded-lg hover:border-indigo-300 transition-colors bg-white">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">1</div>
                        <div className="w-0.5 h-full bg-indigo-100 my-1"></div>
                      </div>
                      <div className="flex-1 pb-4">
                        <h4 className="text-lg font-semibold text-slate-800">{conversationRoadmap.minggu1.title}</h4>
                        <p className="text-slate-600 text-sm mb-3">{conversationRoadmap.minggu1.description}</p>
                        <Button variant="outline" size="sm" onClick={() => handleStartConversation('minggu1')}>
                          Lihat Panduan
                        </Button>
                      </div>
                    </div>

                    {/* Week 2 */}
                    <div className="flex gap-4 p-4 border border-slate-200 rounded-lg hover:border-indigo-300 transition-colors bg-white opacity-80">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold">2</div>
                        <div className="w-0.5 h-full bg-slate-100 my-1"></div>
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex justify-between items-start">
                          <h4 className="text-lg font-semibold text-slate-800">{conversationRoadmap.minggu2.title}</h4>
                          <Badge variant="secondary">Terkunci</Badge>
                        </div>
                        <p className="text-slate-600 text-sm mb-3">{conversationRoadmap.minggu2.description}</p>
                        <p className="text-xs text-amber-600 bg-amber-50 inline-block px-2 py-1 rounded">
                          Selesaikan sesi Keluarga terlebih dahulu
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step.startsWith('conversation-')) {
    const week = step.split('-')[1];
    const data = conversationRoadmap[week];

    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" onClick={handleBackToDashboard} className="mb-6 -ml-4 text-slate-500">
            &larr; Kembali ke Dashboard
          </Button>
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{data.title}</h1>
            <p className="text-lg text-slate-600">{data.description}</p>
          </div>

          <div className="space-y-8">
            {data.items.map((item, index) => (
              <Card key={item.id} className="border-t-4 border-t-indigo-500 shadow-md">
                <CardHeader className="bg-slate-50/50 border-b pb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0 mt-1">
                      {index + 1}
                    </div>
                    <div>
                      <CardTitle className="text-xl leading-snug">{item.pertanyaan}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  
                  {/* Kenapa ini penting */}
                  <div className="flex gap-3">
                    <div className="mt-0.5"><Info className="w-5 h-5 text-blue-500"/></div>
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm mb-1 uppercase tracking-wider">Kenapa ini penting?</h4>
                      <p className="text-slate-600">{item.alasan}</p>
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  {/* Cara Follow Up */}
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm mb-3 uppercase tracking-wider flex items-center gap-2">
                      <MessageSquareHeart className="w-4 h-4"/> Cara Follow Up
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                        <span className="text-xs font-semibold text-indigo-700 bg-indigo-200/50 px-2 py-1 rounded inline-block mb-2">
                          Jika Jawabannya:
                        </span>
                        <p className="text-sm font-medium mb-3 text-slate-800">"{item.followUpA.kondisi}"</p>
                        <p className="text-sm text-indigo-900 font-medium italic border-l-2 border-indigo-400 pl-3">
                          Tanya: "{item.followUpA.tanya}"
                        </p>
                      </div>
                      <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                         <span className="text-xs font-semibold text-emerald-700 bg-emerald-200/50 px-2 py-1 rounded inline-block mb-2">
                          Jika Jawabannya:
                        </span>
                        <p className="text-sm font-medium mb-3 text-slate-800">"{item.followUpB.kondisi}"</p>
                        <p className="text-sm text-emerald-900 font-medium italic border-l-2 border-emerald-400 pl-3">
                          Tanya: "{item.followUpB.tanya}"
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Warning & Insight Accordion */}
                  <Accordion type="single" collapsible className="w-full mt-4">
                    <AccordionItem value="warning">
                      <AccordionTrigger className="text-amber-700 hover:text-amber-800 bg-amber-50 px-4 rounded-t-lg hover:no-underline">
                        <div className="flex items-center gap-2">
                          <ShieldAlert className="w-5 h-5"/> Peringatan (Red Flags & Bias)
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="bg-amber-50/50 px-4 pt-4 pb-4 rounded-b-lg border-x border-b border-amber-100">
                        <p className="text-amber-900 text-sm">{item.warning}</p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="insight" className="mt-2">
                      <AccordionTrigger className="text-purple-700 hover:text-purple-800 bg-purple-50 px-4 rounded-t-lg hover:no-underline">
                        <div className="flex items-center gap-2">
                          <Target className="w-5 h-5"/> Meaning Analyzer (Insight)
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="bg-purple-50/50 px-4 pt-4 pb-4 rounded-b-lg border-x border-b border-purple-100">
                        <p className="text-purple-900 text-sm mb-2">{item.insight}</p>
                        <p className="text-xs text-purple-600/70 italic">*Disclaimer: Ini bukan diagnosis psikologis klinis, hanya panduan observasi pola komunikasi.</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                </CardContent>
              </Card>
            ))}

            <div className="flex justify-center pt-8">
              <Button onClick={handleBackToDashboard} className="bg-emerald-600 hover:bg-emerald-700 text-lg py-6 px-8">
                <CheckCircle2 className="w-5 h-5 mr-2"/> Selesaikan Sesi Ini
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default RelationshipTool;