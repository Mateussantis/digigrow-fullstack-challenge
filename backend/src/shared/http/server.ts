import { env } from '@/shared/env';
import { app } from '.';

app.listen(env.PORT, () => console.log(`server running on port ${env.PORT}`));
