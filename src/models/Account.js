export default function Account(id, data){
  const AccountTypes = {ADMIN: 'admin', EDITOR: 'editor', UPDATER: 'updater', DISABLED: 'disabled'};

  // these arguments are optional
  id = id ?? '';
  data = data ?? {};

  return {
      id: id,
      email: data.email ?? '',
      image: data.image ?? null,
      role: data.role ?? null,
      authenticationUID: data.authenticationUID ?? null, //TODO: Make use AccountTypes
  }
}

// export default {Account};
