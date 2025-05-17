<template>
	<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700">
		<div class="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
			<div>
				<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
					Bem-vindo ao TrackGo
				</h2>
				<p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
					Faça login para continuar
				</p>
			</div>
			<div class="mt-8 space-y-6">
				<LoginButton class="w-full" />
			</div>
		</div>
	</div>
</template>