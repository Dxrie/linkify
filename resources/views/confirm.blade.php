<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @vite('resources/css/app.css')
    <title>Leaving Our Site</title>
</head>

<body>
    <div
        class="flex justify-center items-center min-h-dvh bg-gradient-to-br from-primary from-10% via-secondary via-30% to-blue-400 to-90% text-white animate-gradient-x">
        <div class="bg-background text-foreground p-8 rounded-2xl border shadow-2xl max-w-lg w-full text-center">
            <h1 class="text-2xl font-bold mb-4">You're about to leave our site</h1>
            <p class="mb-6">
                The link you clicked will take you to:
            </p>
            <div class="bg-gray-100 overflow-scroll p-3 rounded-md font-mono text-sm break-all mb-6">
                {{ $url }}
            </div>
            <div class="flex justify-center gap-4">
                <a href="{{ $url }}"
                    class="px-5 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/60 transition">
                    Proceed
                </a>
                <a href="{{ url('/') }}"
                    class="px-5 py-2 bg-destructive text-white rounded-lg hover:bg-destructive/60 transition">
                    Cancel
                </a>
            </div>
            <p class="text-xs text-gray-500 mt-6">
                We are not responsible for the content of external sites.
            </p>
        </div>

        <div class="waves-container">
            <div class="waves wave1"></div>
            <div class="waves wave2"></div>
            <div class="waves wave3"></div>
        </div>
    </div>
</body>

</html>
