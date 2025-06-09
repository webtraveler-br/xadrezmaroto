import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';

import '@/styles/home.scss';

export default function Home() {
	return (
		<div className="home-container">
			<Header />

			<main className="home-hero">
				<h2>Jogue xadrez online com outras capivarinhas!</h2>
				<p>Desafie amigos, conheça novos jogadores e divirta-se em uma plataforma simples e intuitiva.</p>
				<Button variant="play">Jogar Agora</Button>
			</main>

			<Footer />
		</div>
	);
}
