"""Artical externalId

Revision ID: 356a87c27859
Revises: 3a4ef34e1216
Create Date: 2015-10-11 13:17:18.337955

"""

# revision identifiers, used by Alembic.
revision = '356a87c27859'
down_revision = '3a4ef34e1216'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.alter_column('article', 'articleId', new_column_name='externalId', existing_type=sa.String(50), type=sa.String(50), nullable=False, existing_nullable=False)

def downgrade():
    op.alter_column('article', 'externalId', new_column_name='articleId', existing_type=sa.String(50), type=sa.String(50), nullable=False, existing_nullable=False)
