import { MouseEvent as ReactMouseEvent } from 'react';
import {
  Field,
  QueryBuilder,
  Rule,
  RuleProps,
  useRule,
} from 'react-querybuilder';

const petFields: Field[] = [
  { name: 'species', label: 'Species' },
  { name: 'breed', label: 'Breed' },
  { name: 'size', label: 'Size' },
];

export const CustomRule = (props: RuleProps) => {
  const r = { ...props, ...useRule(props) };

  if (props.field === 'hasPet') {
    const {
      schema: {
        controls: {
          fieldSelector: FieldSelectorControlElement,
          removeRuleAction: RemoveRuleActionControlElement,
        },
      },
    } = props;

    const [cloneRule, toggleLockRule, removeRule] = [
      r.cloneRule,
      r.toggleLockRule,
      r.removeRule,
    ].map(f => (event: ReactMouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      f();
    });

    const fieldChangeHandler = r.generateOnChangeHandler('field');
    const valueChangeHandler = r.generateOnChangeHandler('value');

    return (
      <div
        ref={r.dndRef}
        data-dragmonitorid={r.dragMonitorId}
        data-dropmonitorid={r.dropMonitorId}
        className={r.outerClassName}
        data-rule-id={r.id}
        data-level={r.path.length}
        data-path={JSON.stringify(r.path)}
        style={{ display: 'block' }}
      >
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <FieldSelectorControlElement
            options={r.schema.fields}
            title={r.translations.fields.title}
            value={r.rule.field}
            operator={r.rule.operator}
            className={r.classNames.fields}
            handleOnChange={fieldChangeHandler}
            level={r.path.length}
            path={r.path}
            disabled={r.disabled}
            context={r.context}
            validation={r.validationResult}
            schema={r.schema}
          />
          <RemoveRuleActionControlElement
            label={r.translations.removeRule.label}
            title={r.translations.removeRule.title}
            className={r.classNames.removeRule}
            handleOnClick={removeRule}
            level={r.path.length}
            path={r.path}
            disabled={r.disabled}
            context={r.context}
            validation={r.validationResult}
            ruleOrGroup={r.rule}
            schema={r.schema}
          />
        </div>
        <QueryBuilder
          fields={petFields}
          query={props.value}
          onQueryChange={valueChangeHandler}
        />
      </div>
    );
  }

  return <Rule {...props} />;
};
