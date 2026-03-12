interface ApiKeyConfig {
    key: string;
    name: string;
    required: boolean;
}

function normalizeEnvValue(value: string): string {
    return value.trim().replace(/^['"]|['"]$/g, '');
}

const API_KEY_CONFIGS: ApiKeyConfig[] = [
    {
        key: 'NEXT_PUBLIC_SIMLI_API_KEY',
        name: 'Public Simli Key',
        required: true
    },
    {
        key: 'ELEVENLABS_API_KEY',
        name: 'ElevenLabs',
        required: true
    },
    {
        key: 'OPENAI_API_KEY',
        name: 'OpenAI',
        required: true
    },
    {
        key: 'DEEPGRAM_API_KEY',
        name: 'Deepgram',
        required: true
    }
];

export function validateApiKeys(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    for (const config of API_KEY_CONFIGS) {
        const rawValue = process.env[config.key];

        // Check if key exists
        if (!rawValue) {
            if (config.required) {
                errors.push(`${config.name} API key (${config.key}) is missing`);
            }
            continue;
        }

        const value = normalizeEnvValue(rawValue);
        if (!value) {
            if (config.required) {
                errors.push(`${config.name} API key (${config.key}) is missing`);
            }
            continue;
        }

    }

    return {
        valid: errors.length === 0,
        errors
    };
}
