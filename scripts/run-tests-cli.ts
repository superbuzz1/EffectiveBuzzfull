import { executeAllServiceTests } from '../src/backend/tests/run-tests';

executeAllServiceTests((msg) => console.log(msg))
  .then((result) => {
    process.exit(result.success ? 0 : 1);
  })
  .catch((err) => {
    console.error("Test execution engine failure:", err);
    process.exit(1);
  });
