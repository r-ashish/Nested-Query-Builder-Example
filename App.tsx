import { useState } from 'react';
import type { Field, RuleGroupType } from 'react-querybuilder';
import { formatQuery, QueryBuilder } from 'react-querybuilder';
import { CustomRule } from './CustomRule';
import './styles.scss';

const fields: Field[] = [
  { name: 'firstName', label: 'First Name' },
  { name: 'lastName', label: 'Last Name' },
  { name: 'hasPet', label: 'Has Pet' },
];

const initialQuery: RuleGroupType = {
  combinator: 'and',
  rules: [
    { field: 'firstName', operator: 'beginsWith', value: 'Stev' },
    { field: 'lastName', operator: 'in', value: 'Vai,Vaughan' },
    {
      field: 'hasPet',
      operator: '=',
      value: {
        combinator: 'and',
        rules: [{ field: 'breed', operator: 'beginsWith', value: 'Rare' }],
      },
    },
  ],
};

export const App = () => {
  const [query, setQuery] = useState(initialQuery);

  return (
    <div>
      <QueryBuilder
        fields={fields}
        query={query}
        onQueryChange={q => setQuery(q)}
        controlElements={{
          rule: CustomRule,
        }}
      />

      <h4>Query</h4>
      <pre>
        <code>{formatQuery(query, 'json')}</code>
      </pre>
    </div>
  );
};
