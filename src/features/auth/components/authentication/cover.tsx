import authCover from "../../assets/auth-cover.png";

export const Cover = () => {
	return (
		<>
			<div
				className="fixed inset-0 bg-cover bg-center bg-no-repeat"
				style={{ backgroundImage: `url(${authCover})` }}
				aria-hidden="true"
			/>

			<div className="fixed inset-0 bg-background/20" aria-hidden="true" />

			<section
				className="relative hidden min-h-screen w-3/5 lg:flex"
				aria-label="Scrumify"
			>
				<header className="fixed left-12 top-10 z-10">
					<h1 className="font-serif text-4xl font-normal tracking-tight text-white">
						Scrumify
					</h1>
				</header>

				<div className="fixed right-[20%] top-[35%] flex w-full justify-center">
					<p className="text-center font-serif text-2xl italic leading-tight text-white/80">
						Precision in every cycle.
						<br />
						Focus on what matters.
					</p>
				</div>

				<small className="fixed bottom-8 left-12 z-10 font-mono text-[10px] tracking-[0.2em] text-white/50">
					V2.0 — BUILT FOR TEAMS
				</small>
			</section>
		</>
	);
};
