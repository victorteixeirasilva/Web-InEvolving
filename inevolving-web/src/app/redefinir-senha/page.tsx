'use client';

import { useSearchParams } from 'next/navigation';

export default function RedefinirSenha() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  return (
    <div>
      <h1>Redefinir Senha</h1>
      <p>Token recebido: {token}</p>
    </div>
  );
}