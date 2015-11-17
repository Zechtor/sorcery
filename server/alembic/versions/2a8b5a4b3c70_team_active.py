"""team-active

Revision ID: 2a8b5a4b3c70
Revises: 3d1f064cdd6a
Create Date: 2015-11-15 20:38:03.484553

"""

# revision identifiers, used by Alembic.
revision = '2a8b5a4b3c70'
down_revision = '3d1f064cdd6a'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.add_column('team', sa.Column('active', sa.Boolean, nullable=False))


def downgrade():
    op.drop_column('team', 'active')
