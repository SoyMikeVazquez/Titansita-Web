import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ffbjqwvadxnqrbxnysjl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmYmpxd3ZhZHhucXJieG55c2psIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwODY5MzksImV4cCI6MjA3NjY2MjkzOX0.sH2yt0Yfi1z4sdUSlSi8LEcVbQHYw-N7bZqOQYjUIX0';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const sampleProducts = [
  {
    name: "Titansita Whey Protein Isolate",
    description: "Proteína de suero aislada de máxima pureza para recuperación muscular acelerada.",
    price: 49.99,
    category: "Proteínas",
    image_url: "titansita_whey_1785432048349.png",
    stock: 50
  },
  {
    name: "Pre-Workout Explosive Energy",
    description: "Fórmula concentrada de energía extrema y enfoque mental para entrenamientos intensos.",
    price: 34.99,
    category: "Pre-Entrenos",
    image_url: "titansita_preworkout_1785432058051.png",
    stock: 35
  },
  {
    name: "BCAA Ultra Recovery 2:1:1",
    description: "Aminoácidos de cadena ramificada esenciales para reducir el dolor y la fatiga muscular.",
    price: 29.99,
    category: "Aminoácidos",
    image_url: "titansita_bcaa_1785432067120.png",
    stock: 40
  },
  {
    name: "Pure Creatine Monohydrate",
    description: "Creatina monohidratada micronizada de alta solubilidad para fuerza y potencia explosiva.",
    price: 25.00,
    category: "Rendimiento",
    image_url: "titansita_creatine_1785432076711.png",
    stock: 60
  },
  {
    name: "Optimum Thermo Fat Burner",
    description: "Termogénico potente diseñado para acelerar el metabolismo y favorecer la quema de grasa.",
    price: 39.99,
    category: "Quemadores",
    image_url: "titansita_fatburner_1785432084108.png",
    stock: 25
  }
];

async function seed() {
  console.log("Insertando productos de prueba en Supabase...");
  const { data, error } = await supabase
    .from('products')
    .insert(sampleProducts)
    .select();

  if (error) {
    console.error("Error al insertar productos:", error);
  } else {
    console.log("¡Productos insertados con éxito!", data);
  }
}

seed();
