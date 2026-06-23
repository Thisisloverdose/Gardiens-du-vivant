import Link from 'next/link';
import {
  MapPin,
  Leaf,
  Users,
  TreeDeciduous,
  Heart,
  AlertTriangle,
  Thermometer,
  ArrowRight,
  Sprout,
  Bug,
  Home as HomeIcon,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-leaf-50 via-white to-earth-50">
      {/* Header */}
      <header className="px-4 py-8 md:py-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Leaf className="w-10 h-10 text-leaf-600" />
          <h1 className="text-3xl md:text-5xl font-bold text-leaf-800">
            Ma Commune Vivante
          </h1>
        </div>
        <p className="text-lg md:text-xl text-leaf-600 font-medium max-w-lg mx-auto">
          Observer, signaler et agir pour le vivant autour de vous
        </p>
      </header>

      {/* Section 1 - Le sens du projet */}
      <section className="px-4 py-6 md:px-6 md:py-10 max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm border border-leaf-100 rounded-2xl shadow-sm p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-semibold text-leaf-800 mb-5">
            Le sens du projet
          </h2>

          <div className="space-y-4 text-foreground/80 leading-relaxed">
            <p>
              Le vivant (biodiversite, sols, insectes pollinisateurs, vegetation urbaine)
              joue un role essentiel dans l equilibre des territoires.
            </p>

            <p className="font-medium text-leaf-700">
              Aujourd hui, les communes font face a :
            </p>

            <ul className="space-y-3 ml-2">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                </div>
                <span>degradation des habitats naturels</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Thermometer className="w-4 h-4 text-orange-600" />
                </div>
                <span>augmentation des episodes de chaleur</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bug className="w-4 h-4 text-amber-600" />
                </div>
                <span>perte de biodiversite locale</span>
              </li>
            </ul>

            <div className="bg-leaf-50 border border-leaf-200 rounded-xl p-4 mt-4">
              <p className="text-leaf-800 font-medium text-center">
                Cette application permet aux citoyens d agir concretement a leur echelle
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - A quoi ca sert */}
      <section className="px-4 py-6 md:px-6 md:py-10 max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm border border-leaf-100 rounded-2xl shadow-sm p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-semibold text-leaf-800 mb-5">
            A quoi ca sert ?
          </h2>

          <div className="grid gap-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-red-50 border border-red-100 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-red-200 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-foreground/90">Signaler des problemes environnementaux</span>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-amber-50 border border-amber-100 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0">
                <Sprout className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-foreground/90">Participer a des actions locales</span>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-leaf-50 border border-leaf-100 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-leaf-200 flex items-center justify-center flex-shrink-0">
                <HomeIcon className="w-5 h-5 text-leaf-600" />
              </div>
              <span className="text-foreground/90">Creer des refuges pour la biodiversite</span>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 border border-blue-100 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-foreground/90">Etre connecte aux acteurs locaux</span>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-emerald-50 border border-emerald-100 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-emerald-200 flex items-center justify-center flex-shrink-0">
                <Leaf className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-foreground/90">Suivre la dynamique du vivant dans sa commune</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Comment ca marche */}
      <section className="px-4 py-6 md:px-6 md:py-10 max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm border border-leaf-100 rounded-2xl shadow-sm p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-semibold text-leaf-800 mb-5">
            Comment ca marche ?
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-leaf-50 to-transparent border-l-4 border-leaf-400">
              <div className="w-10 h-10 rounded-full bg-leaf-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <span className="text-foreground/90">Choisir sa commune (ou via geolocalisation)</span>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-leaf-100 to-transparent border-l-4 border-leaf-500">
              <div className="w-10 h-10 rounded-full bg-leaf-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <span className="text-foreground/90">Observer son environnement</span>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-leaf-200 to-transparent border-l-4 border-leaf-600">
              <div className="w-10 h-10 rounded-full bg-leaf-700 text-white flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <span className="text-foreground/90">Signaler ou agir</span>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-leaf-300 to-transparent border-l-4 border-leaf-700">
              <div className="w-10 h-10 rounded-full bg-leaf-800 text-white flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <span className="text-foreground/90">Creer du vivant</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 - CTA */}
      <section className="px-4 py-8 md:py-12 max-w-md mx-auto pb-12">
        <div className="space-y-4">
          <Link
            href="/map"
            className="w-full bg-leaf-600 hover:bg-leaf-700 text-white py-7 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold inline-flex items-center justify-center gap-2"
          >
            <MapPin className="w-5 h-5" />
            Acceder a la carte
            <ArrowRight className="w-5 h-5 ml-1" />
          </Link>

          <Link
            href="/map"
            className="w-full py-6 text-base rounded-xl border border-leaf-300 text-leaf-700 hover:bg-leaf-50 hover:border-leaf-400 inline-flex items-center justify-center transition-colors"
          >
            Continuer sans compte
          </Link>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Gratuit, sans inscription, donnees locales uniquement
        </p>
      </section>
    </div>
  );
}
