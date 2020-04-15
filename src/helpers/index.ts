import { useRouter as useNextRouter } from 'next/router';
import { useEffect, useState } from 'react';

const SHLINK_TAGS_ENDPOINT = 'https://api.github.com/repos/shlinkio/shlink/tags';

interface Tag {
  name: string;
}

const loadTags = async (): Promise<string[]> =>
  fetch(SHLINK_TAGS_ENDPOINT)
    .then(async (res) => res.json())
    .then((tags: Tag[]) => tags.map(({ name }) => name));

export const useRouter = () => {
  const { push, query } = useNextRouter();
  const navigate = async (url: string) => push(url, url, { shallow: true });

  return { navigate, query };
};

export const useShlinkTags = (): { tags: string[]; error: boolean } => {
  const [ tags, setTags ] = useState([] as string[]);
  const [ error, setError ] = useState(false);

  useEffect(() => {
    loadTags()
      .then(setTags)
      .catch(() => setError(true));
  }, []);

  return { tags, error };
};
