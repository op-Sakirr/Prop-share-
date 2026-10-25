'use client';

import React, { Suspense } from 'react';
import ViewPropertyPage from '../view/page';

export default function ShortPropertyRoute() {
  return (
    <Suspense>
      <ViewPropertyPage />
    </Suspense>
  );
}
